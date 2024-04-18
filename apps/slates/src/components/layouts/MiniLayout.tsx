import { ArrangeHorizontalSquare, DriverRefresh, Maximize, Setting3 } from "iconsax-react";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import { move_window, Position } from "tauri-plugin-positioner-api";
import useApp from "@src/hooks/useApp";
import isEmpty from "lodash/isEmpty";
import TextInput from "@src/components/TextInput";

export default function MiniLayout() {
  const { changeToMainWindow, results } = useApp();

  // useEffect(() => {
  //   console.log('width, height', width, height)
  //   if (!height) {
  //     return;
  //   }

  //   appWindow.innerPosition().then(e => console.log('inner', e));
  //   appWindow.innerSize().then(e => console.log('size', e));

  //   appWindow.setSize(new LogicalSize(width, height)).then(() => move_window(Position.TopRight)).catch(console.log)
  // }, [height])
  return (
    <div className="flex flex-col rounded-t-[16px] h-full opacity-90">
      <div className="bg-base-200 rounded-none rounded-t-[16px] ">
        <TextInput className="textarea textarea-ghost textarea-xs text-2xl focus:outline-none focus:border-none bg-base-200 w-full border-0" />
      </div>
      {!isEmpty(results) && (
        <div className="grow bg-base-200 border-t border-neutral p-2 overflow-auto scrollbar-thin">
          <pre>{JSON.stringify({ results }, null, 2)}</pre>
        </div>
      )}
      <div className="bg-base-100 rounded-b-[16px] p-2 flex justify-between border-t border-neutral shadow-xl">
        <div className="tooltip" data-tip="Swap language">
          <span
            className="btn btn-link btn-xs text-primary"
            onClick={() =>
              appWindow
                .setSize(new LogicalSize(400, 500))
                .then(() => move_window(Position.TopRight))
                .catch(console.log)
            }
          >
            <ArrangeHorizontalSquare size={22} />
            Auto Detect - Indonesia
          </span>
        </div>
        <div className="flex gap-1">
          <div
            className="tooltip tooltip-left"
            data-tip="Disable auto translate"
          >
            <span className="btn btn-link btn-xs p-0 text-success">
              <DriverRefresh size={22} />
            </span>
          </div>
          <div className="tooltip tooltip-left" data-tip="Open in main window">
            <span
              onClick={() => changeToMainWindow()}
              className="btn btn-link btn-xs p-0 text-base-content"
            >
              <Maximize size={22} className="rotate-180" />
            </span>
          </div>
          <div className=" tooltip tooltip-left" data-tip="Open settings">
            <span className="btn btn-link btn-xs p-0 text-base-content">
              <Setting3 size={22} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
