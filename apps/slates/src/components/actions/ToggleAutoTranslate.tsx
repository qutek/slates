import useSettings from "@src/hooks/useSettings";
import { classNames } from "@src/utils/common";
import { DriverRefresh } from "iconsax-react";
import { useShallow } from "zustand/react/shallow";

export default function ToggleAutoTranslate({
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
      data-tip={autoTranslate ? "Disable auto translate" : "Enable auto translate"}
    >
      <span
        onClick={toggleAutoTranslate}
        className={classNames(
          "btn btn-link btn-xs p-0",
          autoTranslate ? "text-success" : "text-base-content"
        )}
      >
        <DriverRefresh size={22} />
      </span>
    </div>
  );
}
