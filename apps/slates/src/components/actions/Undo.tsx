import useApp from "@src/hooks/useApp";
import { classNames } from "@src/utils/common";
import { BackSquare } from "iconsax-react";

export default function Undo({
  tooltipPosition,
}: {
  tooltipPosition: string | boolean;
}) {
  const { undo } = useApp();
  return (
    <div
      className={classNames(
        tooltipPosition ? "tooltip" : "",
        "top" === tooltipPosition ? "tooltip-top" : ""
      )}
      data-tip="Undo"
    >
      <span
        onClick={() => undo()}
        className="btn btn-link btn-xs p-0 text-base-content"
      >
        <BackSquare size={22} />
      </span>
    </div>
  );
}
