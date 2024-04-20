import { ArrangeHorizontalSquare } from "iconsax-react";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import { move_window, Position } from "tauri-plugin-positioner-api";
import useApp from "@src/hooks/useApp";
import isEmpty from "lodash/isEmpty";
import TextInput from "@src/components/TextInput";
import MiniBottomBar from "@src/components/layouts/MiniBottomBar";
import { useEffect } from "react";

export default function MiniLayout() {
  const { results } = useApp();
  const hasResult = !isEmpty(results);

  useEffect(() => {
    const setWindowSize = async (hasResult: boolean) => {
      const factor = await appWindow.scaleFactor();
      const size = await appWindow.innerSize();
      const logical = size.toLogical(factor);

      if (hasResult) {
        await appWindow.setSize(new LogicalSize(logical.width, 600))
      } else {
        await appWindow.setSize(new LogicalSize(logical.width, 129))
      }
    }
    setWindowSize(hasResult);
  }, [hasResult]);

  return (
    <div className="flex flex-col rounded-t-[16px] max-h-full opacity-90">
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
        <MiniBottomBar />
      </div>
    </div>
  );
}
