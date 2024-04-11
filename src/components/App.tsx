import { useEffect } from "react";
import { isRegistered, register } from "@tauri-apps/api/globalShortcut";
import { appWindow } from '@tauri-apps/api/window';
// import { move_window, Position } from "tauri-plugin-positioner-api";
import useAppSettings from "@src/hooks/useAppSettings";

const SHORTCUT = "CommandOrControl+Shift+T";
export default function App() {
  const settings = useAppSettings();

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
          }
          console.log(SHORTCUT, { e });
        });
      }
    });
  }, []);

  return (
    <div>
      <p>🐻 number:{settings.bears}</p>
      <button onClick={() => settings.addABear()}>Add more 🐻</button>
    </div>
  );
}
