import useApp from "@frontend/hooks/useApp";
import { classNames } from "@frontend/utils/common";
import { Maximize } from "iconsax-react";

export default function MoveToMiniWindow({
  tooltipPosition,
}: {
  tooltipPosition: string | boolean;
}) {
  const { changeToMiniWindow } = useApp();
  return (
    <div
      className={classNames(
        tooltipPosition ? "tooltip" : "",
        "top" === tooltipPosition ? "tooltip-top" : "",
        "right" === tooltipPosition ? "tooltip-right" : "",
        "left" === tooltipPosition ? "tooltip-left" : ""
      )}
      data-tip="Use mini window"
    >
      <span onClick={() => changeToMiniWindow()} className="btn btn-link btn-xs p-0 text-primary">
        <Maximize size={22} />
      </span>
    </div>
  );
}
