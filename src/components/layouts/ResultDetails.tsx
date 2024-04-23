import { classNames } from "@frontend/utils/common";
import _, { map } from "lodash";
import { useMemo, useState } from "react";
import Meanings from "./result-details/Meanings";
import Definitions from "./result-details/Definitions";
import Examples from "./result-details/Examples";

export default function ResultDetails(props: any) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const tabs = useMemo(() => {
    return _.chain(props)
      .keys()
      .map((key) => ({
        id: key,
        title: _.startCase(_.lowerCase(key)),
        data: props[key],
      }))
      .value();
  }, [props]);

  return (
    <>
      <div role="tablist" className="tabs tabs-lifted w-full px-2">
        {map(tabs, (tab, i) => (
          <a
            key={i}
            onClick={() => setActiveIndex(i)}
            role="tab"
            className={classNames(
              "tab [--tab-bg:var(--fallback-n,oklch(var(--n)))] [--tab-border-color:var(--fallback-n,oklch(var(--n)))] [--tab-color:var(--fallback-nc,oklch(var(--nc)))]",
              i === activeIndex ? "tab-active" : ""
            )}
          >
            {tab.title}
          </a>
        ))}
      </div>
      <div className="p-2 overflow-auto no-scrollbar bg-[var(--fallback-n,oklch(var(--n)))] rounded-btn">
        {"detailedMeanings" === tabs[activeIndex]?.id && (
          <Meanings data={tabs[activeIndex]?.data} />
        )}

        {"definitions" === tabs[activeIndex]?.id && (
          <Definitions data={tabs[activeIndex]?.data} />
        )}

        {"examples" === tabs[activeIndex]?.id && (
          <Examples data={tabs[activeIndex]?.data} />
        )}

        {/* <pre>{JSON.stringify(tabs[activeIndex], null, 2)}</pre> */}
      </div>
    </>
  );
}
