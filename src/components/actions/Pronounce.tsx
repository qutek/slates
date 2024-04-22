import { classNames } from "@frontend/utils/common";
import { VolumeHigh } from "iconsax-react";

export default function Pronounce({
  tooltipPosition,
}: {
  tooltipPosition: string | boolean;
}) {
  return null;
  return (
    <div
      className={classNames(
        tooltipPosition ? "tooltip" : "",
        "top" === tooltipPosition ? "tooltip-top" : "",
        "left" === tooltipPosition ? "tooltip-left" : ""
      )}
      data-tip="Pronounce"
    >
      <span className="btn btn-link btn-xs p-0 text-base-content">
        <VolumeHigh size={22} />
      </span>
    </div>
  );
}
