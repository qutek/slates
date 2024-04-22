import useSettings from "@frontend/hooks/useSettings";
import { classNames } from "@frontend/utils/common";
import { Translate } from "iconsax-react";
import { useShallow } from "zustand/react/shallow";

export default function SwapLanguage({
  tooltipPosition,
}: {
  tooltipPosition: string | boolean;
}) {
  const { swapLanguage, sourceLang, targetLang } = useSettings(
    useShallow((state) => ({
      swapLanguage: state.swapLanguage,
      sourceLang: state.sourceLang,
      targetLang: state.targetLang,
    }))
  );

  return (
    <div
      className={classNames(
        tooltipPosition ? "tooltip" : "",
        "top" === tooltipPosition ? "tooltip-top" : "",
        "right" === tooltipPosition ? "tooltip-right" : "",
        "left" === tooltipPosition ? "tooltip-left" : ""
      )}
      data-tip="Swap language"
    >
      <span
        onClick={() => swapLanguage()}
        className={classNames(
          "btn btn-link btn-xs p-0 text-primary",
          [sourceLang, targetLang].includes("auto") ? "btn-disabled" : ""
        )}
      >
        <Translate size={22} />
      </span>
    </div>
  );
}
