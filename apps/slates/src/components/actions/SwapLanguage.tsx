import useSettings from "@src/hooks/useSettings";
import { classNames } from "@src/utils/common";
import { Translate } from "iconsax-react";
import { useShallow } from "zustand/react/shallow";

export default function SwapLanguage({
  tooltipPosition,
}: {
  tooltipPosition: string | boolean;
}) {
  const { autoTranslate, setState } = useSettings(
    useShallow((state) => ({
      autoTranslate: state.autoTranslate,
      setState: state.setState,
    }))
  );

  const toggleAutoTranslate = () => {
    setState({
      autoTranslate: !autoTranslate,
    });
  };

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
        onClick={toggleAutoTranslate}
        className={classNames(
          "btn btn-link btn-xs p-0",
          autoTranslate ? "text-success" : "text-base-content"
        )}
      >
        <Translate size={22} className={autoTranslate ? "scale-x-[-1]" : ""} />
      </span>
    </div>
  );
}
