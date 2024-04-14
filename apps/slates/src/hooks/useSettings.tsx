import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { Store } from "tauri-plugin-store-api";

const settingsStore = new Store("./slates-settings.bin");

interface Settings {
  theme: string;
  setTheme: (theme: string) => void;
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
      theme: "dark",
      setTheme: (theme: string) => set({ theme }),
    }),
    {
      name: "slates-settings", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => settingsStorage(settingsStore)), // (optional) by default the 'localStorage' is used
    }
  )
);

export default useSettings;
