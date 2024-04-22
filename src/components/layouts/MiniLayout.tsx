import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import useApp from "@frontend/hooks/useApp";
import isEmpty from "lodash/isEmpty";
import TextInput from "@frontend/components/TextInput";
import MiniBottomBar from "@frontend/components/layouts/MiniBottomBar";
import { useEffect } from "react";
import ResultDetails from "./ResultDetails";
import useSettings from "@frontend/hooks/useSettings";
import { useShallow } from "zustand/react/shallow";
import { getLang } from "@frontend/utils/languages";
import SwapLanguage from "@frontend/components/actions/SwapLanguage";

export default function MiniLayout() {
  const { results } = useApp();
  const { sourceLang, targetLang } = useSettings(
    useShallow((state) => ({
      sourceLang: state.sourceLang,
      targetLang: state.targetLang,
    }))
  );
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
          {!isEmpty(resultDetails) && <ResultDetails {...resultDetails} />}
        </div>
      )}
      <div className="bg-base-100 rounded-b-[16px] p-2 flex justify-between items-center border-t border-neutral shadow-xl">
        <div className="flex items-center gap-1">
          <SwapLanguage tooltipPosition="right" />
          <span className="text-sm text-primary font-medium pb-1">{`${getLang(sourceLang)?.name} - ${getLang(targetLang)?.name}`}</span>
        </div>
        <MiniBottomBar />
      </div>
    </div>
  );
}
