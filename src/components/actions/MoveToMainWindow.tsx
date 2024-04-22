import useApp from "@frontend/hooks/useApp";
import { classNames } from "@frontend/utils/common";
import { Maximize } from "iconsax-react";

export default function MoveToMainWindow({
  tooltipPosition,
}: {
  tooltipPosition: string | boolean;
}) {
  const { changeToMainWindow } = useApp();
  return (
    <div
      className={classNames(
        tooltipPosition ? "tooltip" : "",
        "top" === tooltipPosition ? "tooltip-top" : "",
        "right" === tooltipPosition ? "tooltip-right" : "",
        "left" === tooltipPosition ? "tooltip-left" : ""
      )}
      data-tip="Open in main window"
    >
      <span onClick={() => changeToMainWindow()} className="btn btn-link btn-xs p-0 text-primary">
        <Maximize size={22} className="rotate-180" />
      </span>
    </div>
  );
}
