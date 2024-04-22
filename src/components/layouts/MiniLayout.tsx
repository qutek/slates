import { ArrangeHorizontalSquare } from "iconsax-react";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import { move_window, Position } from "tauri-plugin-positioner-api";
import useApp from "@frontend/hooks/useApp";
import isEmpty from "lodash/isEmpty";
import TextInput from "@frontend/components/TextInput";
import MiniBottomBar from "@frontend/components/layouts/MiniBottomBar";
import { useEffect, useState } from "react";
import ResultDetails from "./ResultDetails";

export default function MiniLayout() {
  const [openDetails, setOpenDetails] = useState<boolean>(true);
  const { results } = useApp();
  const { mainMeaning, originalText, sPronunciation, ...resultDetails } =
    results;
  const hasResult = !isEmpty(results);

  useEffect(() => {
    const setWindowSize = async (hasResult: boolean) => {
      const factor = await appWindow.scaleFactor();
      const size = await appWindow.innerSize();
      const logical = size.toLogical(factor);

      if (hasResult) {
        await appWindow.setSize(new LogicalSize(logical.width, 600));
      } else {
        await appWindow.setSize(new LogicalSize(logical.width, 129));
      }
    };
    setWindowSize(hasResult);
  }, [hasResult]);

  return (
    <div className="flex flex-col rounded-t-[16px] h-full opacity-90">
      <div className="bg-base-200 rounded-none rounded-t-[16px] ">
        <TextInput className="textarea textarea-ghost textarea-xs text-2xl focus:outline-none focus:border-none bg-base-200 w-full border-0 no-scrollbar resize-none" />
      </div>
      {!isEmpty(results) && (
        <div className="grow bg-base-200 border-t border-neutral p-2 overflow-auto scrollbar-thin">
          <div className="p-3 text-2xl">{mainMeaning}</div>
          {openDetails && <ResultDetails {...resultDetails} />}
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
