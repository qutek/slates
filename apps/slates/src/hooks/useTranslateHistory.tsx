import { create } from "zustand";
import { temporal } from "zundo";

// Define the type of your store state (typescript)
interface TranslateState {
  text: string;
  setText: (text: string) => void;
  clearText: () => void;
}

// Use `temporal` middleware to create a store with undo/redo capabilities
const useTranslateHistory = create<TranslateState>()(
  temporal((set) => ({
    text: '',
    setText: text => set({ text: text }),
    clearText: () => set({ text: '' }),
  }))
);

export default useTranslateHistory;
