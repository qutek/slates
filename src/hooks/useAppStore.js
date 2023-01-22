import create from 'zustand'
import shallow from 'zustand/shallow';
import { persist, createJSONStorage } from 'zustand/middleware'
import { temporal } from 'zundo';
import pick from 'lodash/pick';
import slates from 'slates';

import { mountStoreDevtool } from 'simple-zustand-devtools';

const SLATES_STORE_VERSION = 0;

// Custom storage object
const slatesStorage = {
  getItem: async (name) => {
    const value = await slates.invoke(name, 'get', SLATES_STORE_VERSION);
    return value || null;
  },
  setItem: async (name, value) => {
    slates.invoke(name, 'set', value);
  },
  removeItem: async (name) => {
    slates.invoke(name, 'remove');
  },
}

export const useAppStore = create(
  persist(
    (set, get) => ({
      useMini: false,
      isDarkMode: false,
      sourceLang: 'auto',
      targetLang: 'id',
      reverseTranslate: false,
      modalLang: null, // sourceLang | targetLang.
      translateResult: null,
      showDetailResult: false,
      setState: newState => set(state => ({ ...state, ...newState })),
    }),
    {
      name: 'slates-store', // unique name
      version: SLATES_STORE_VERSION, // default 0
      storage: createJSONStorage(() => slatesStorage),
      // just pick item we want to store to main.
      partialize: state => pick(state, ['useMini', 'isDarkMode', 'sourceLang', 'targetLang', 'reverseTranslate']),
    }
  )
);

export const useLanguage = () => {
  const {
    sourceLang,
    targetLang,
    reverseTranslate,
  } = useAppStore(state => ({
    sourceLang: state.sourceLang,
    targetLang: state.targetLang,
    reverseTranslate: state.reverseTranslate,
  }), shallow);

  return {
    source: reverseTranslate ? targetLang : sourceLang,
    target: reverseTranslate ? sourceLang : targetLang,
  }
}

// creates a store with undo/redo capability
export const useTranslateStore = create()(
  temporal((set) => ({
    text: '',
    setText: text => set({ text: text }),
    clearText: () => set({ text: '' }),
  }))
);

export const useTemporalTranslateStore = create(useTranslateStore.temporal);

if (IS_DEV) {
  window.store = useAppStore;
  mountStoreDevtool('App Store', useAppStore);
  mountStoreDevtool('Translate Store', useTranslateStore);
  mountStoreDevtool('Translate Temporal', useTemporalTranslateStore);
}
