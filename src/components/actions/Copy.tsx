import useApp from "@src/hooks/useApp";
import { classNames } from "@src/utils/common";
import { Copy as CopyIcon, CopySuccess } from "iconsax-react";
import { useState } from "react";

export default function Copy({
  text,
  tooltipPosition,
}: {
  text: string;
  tooltipPosition?: string | boolean;
}) {
  const [copying, setCopying] = useState<boolean>(false);
  const { copy } = useApp();

  const handleCopy = async () => {
    copy(text)
      .then(() => setCopying(true))
      .finally(() => {
        return new Promise(() => {
          setTimeout(() => {
            setCopying(false);
          }, 1000);
        });
      });
  };

  return (
    <div
      className={classNames(
        tooltipPosition ? "tooltip" : "",
        "top" === tooltipPosition ? "tooltip-top" : "",
        "left" === tooltipPosition ? "tooltip-left" : ""
      )}
      data-tip={copying ? "Copied" : "Copy"}
    >
      <span
        onClick={handleCopy}
        className={classNames(
          "btn btn-link btn-xs p-0",
          !text ? "btn-disabled" : "",
          copying ? "text-success" : "text-base-content"
        )}
      >
        {copying ? <CopySuccess size={22} /> : <CopyIcon size={22} />}
      </span>
    </div>
  );
}
