import useApp from "@src/hooks/useApp";
import { classNames } from "@src/utils/common";
import { Setting3 } from "iconsax-react";

export default function OpenSettings({
  tooltipPosition,
}: {
  tooltipPosition: string | boolean;
}) {
  const { setOpenModal } = useApp();
  return (
    <div
      className={classNames(
        tooltipPosition ? "tooltip" : "",
        "top" === tooltipPosition ? "tooltip-top" : "",
        "right" === tooltipPosition ? "tooltip-right" : "",
        "left" === tooltipPosition ? "tooltip-left" : ""
      )}
      data-tip="Open Settings"
    >
      <span
        onClick={() => setOpenModal("settings")}
        className="btn btn-link btn-xs p-0 text-primary"
      >
        <Setting3 size={22} />
      </span>
    </div>
  );
}
