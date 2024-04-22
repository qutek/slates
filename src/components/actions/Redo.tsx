import useApp from "@src/hooks/useApp";
import { classNames } from "@src/utils/common";
import { ArrowForwardSquare } from "iconsax-react";

export default function Redo({
  tooltipPosition,
}: {
  tooltipPosition: string | boolean;
}) {
  const { redo } = useApp();
  return (
    <div
      className={classNames(
        tooltipPosition ? "tooltip" : "",
        "top" === tooltipPosition ? "tooltip-top" : ""
      )}
      data-tip="Redo"
    >
      <span
        onClick={() => redo()}
        className="btn btn-link btn-xs p-0 text-base-content"
      >
        <ArrowForwardSquare size={22} />
      </span>
    </div>
  );
}
