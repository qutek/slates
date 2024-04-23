import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useShallow } from "zustand/react/shallow";
import useSettings from "@frontend/hooks/useSettings";
import { isRegistered, register } from "@tauri-apps/api/globalShortcut";
import { LogicalSize, appWindow } from "@tauri-apps/api/window";
import { writeText } from '@tauri-apps/api/clipboard';
import translator from "@frontend/utils/translator";
import debounce from "lodash/debounce";
import useTranslateHistory from "@frontend/hooks/useTranslateHistory";
import { Position, move_window } from "tauri-plugin-positioner-api";
import Settings from "@frontend/components/modals/Settings";

const SHORTCUT = "CommandOrControl+Shift+T";

// Define the type for your context value
export interface AppContextValue {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  modalRef: React.RefObject<HTMLDialogElement>;
  openModal: string | null | false;
  setOpenModal: (modal: string | null | false) => void;
  changeToMainWindow: () => void;
  changeToMiniWindow: () => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  copy: (text: string) => Promise<void>;
  results: any;
  miniWindow: boolean;
}

// Create the context
export const AppContext = createContext<AppContextValue | undefined>(undefined);

const useAppContextValue = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [openModal, setOpenModal] = useState<string | false | null>(false);
  const [results, setResults] = useState<any>({});
  // translate history.
  const { text, setText } = useTranslateHistory();
  const { undo, redo, clear } = useTranslateHistory.temporal.getState();

  // settings.
  const { theme, miniWindow, setState, sourceLang, targetLang } = useSettings(
    useShallow((state) => ({
      theme: state.theme,
      miniWindow: state.miniWindow,
      setState: state.setState,
      sourceLang: state.sourceLang,
      targetLang: state.targetLang,
    }))
  );

  const changeToMainWindow = useCallback(() => {
    // already in main window
    if (!miniWindow) {
      return;
    }

    appWindow
      .hide()
      .then(() => appWindow.setSize(new LogicalSize(900, 600)))
      .then(() => move_window(Position.Center))
      .then(() => appWindow.show())
      .then(() => appWindow.setFocus())
      .then(() => appWindow.setAlwaysOnTop(false))
      .then(() => appWindow.setResizable(true))
      .then(() => setState({ miniWindow: false }))
      .catch(console.log);
  }, [miniWindow]);

  const changeToMiniWindow = useCallback(() => {
    // already in mini window.
    if (miniWindow) {
      return;
    }

    appWindow
      .hide()
      .then(() => appWindow.setSize(new LogicalSize(400, 600)))
      .then(() => move_window(Position.TopRight))
      .then(() => appWindow.show())
      .then(() => appWindow.setFocus())
      .then(() => appWindow.setAlwaysOnTop(true))
      .then(() => appWindow.setResizable(false))
      .then(() => setState({ miniWindow: true }))
      .catch(console.log);
  }, [miniWindow]);

  // do translate on text or language changed.
  useEffect(() => {
    if (inputRef.current && text !== inputRef.current?.value) {
      inputRef.current.value = text;
    }

    if (!text) {
      return;
    }

    translator.translate(text, sourceLang, targetLang).then(setResults);
  }, [text, miniWindow, sourceLang, targetLang]);

  // open / close modal
  useEffect(() => {
    if (openModal) {
      // @TODO: modify window on show modal
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [openModal]);

  // common listener.
  useEffect(() => {
    isRegistered(SHORTCUT).then((registered) => {
      if (!registered) {
        return register(SHORTCUT, async (e) => {
          // move_window(Position.TopRight);
          const visible = await appWindow.isVisible();
          if (visible) {
            await appWindow.hide();
          } else {
            await appWindow.show();
            await appWindow.setFocus();
            inputRef.current?.focus();
          }
          console.log(SHORTCUT, { e });
        });
      }
    });

    const handleChange = debounce(() => {
      console.log("handleChange");
      const value = inputRef.current?.value as string;
      setText(value);
      if (!value) {
        setResults({});
      }
    }, 500);

    const handleCloseModal = () => setOpenModal(false);

    if (inputRef.current) {
      inputRef.current.addEventListener("input", handleChange);
    }

    if (modalRef.current) {
      modalRef.current.addEventListener("close", handleCloseModal);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("input", handleChange);
      }

      if (modalRef.current) {
        modalRef.current.removeEventListener("close", handleCloseModal);
      }
    };
  }, [miniWindow]);

  return {
    inputRef,
    modalRef,
    openModal,
    setOpenModal,
    theme,
    miniWindow,
    changeToMainWindow,
    changeToMiniWindow,
    undo,
    redo,
    clear,
    copy: writeText,
    results,
  };
};

// Create the provider component
const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useAppContextValue();

  useEffect(() => {
    document.body.setAttribute("data-theme", value?.theme);
  }, [value?.theme]);

  return (
    <AppContext.Provider value={value}>
      {children}
      <dialog ref={value.modalRef} className="modal rounded-box">
        <div className="modal-box h-full w-11/12 max-w-5xl">
          {value.openModal === "settings" && <Settings />}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </AppContext.Provider>
  );
};

export default AppProvider;
