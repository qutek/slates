import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { Store } from "tauri-plugin-store-api";
// import { pick } from "lodash";

const settingsStore = new Store("./slates-settings.bin");

interface Settings {
  miniWindow: boolean;
  theme: string;
  sourceLang: string;
  targetLang: string;
  reverseTranslate: boolean;
  setState: (state: any) => void;
  swapLanguage: () => void;
}

const settingsStorage = (store: Store): StateStorage => ({
  getItem: async (name: string): Promise<string | null> => {
    console.log("getItem", { name });
    return (await store.get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log("setItem", { name, value });
    await store.set(name, value);
    await store.save();
  },
  removeItem: async (name: string): Promise<void> => {
    console.log("removeItem", { name });
    await store.delete(name);
    await store.save();
  },
});

const useSettings = create<Settings>()(
  persist(
    (set) => ({
      miniWindow: false,
      theme: "dark",
      sourceLang: "auto",
      targetLang: "id",
      reverseTranslate: false,
      translateResult: null,
      showDetailResult: false,
      setState: (newState) => set((state) => ({ ...state, ...newState })),
      swapLanguage: () => set((state) => ({
        ...state,
        sourceLang: state.targetLang,
        targetLang: state.sourceLang
      })),
    }),
    {
      name: "slates-settings", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => settingsStorage(settingsStore)), // (optional) by default the 'localStorage' is used
      // just pick item we want to store persistent.
      // partialize: state => pick(state, ['miniWindow', 'theme', 'sourceLang', 'targetLang', 'reverseTranslate']),
    }
  )
);

export default useSettings;
