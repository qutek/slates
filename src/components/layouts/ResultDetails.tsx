import { classNames } from "@frontend/utils/common";
import _, { map } from "lodash";
import { useMemo, useState } from "react";

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
            className={classNames("tab", i === activeIndex ? "tab-active" : "")}
          >
            {tab.title}
          </a>
        ))}
      </div>
      <div className="p-2 overflow-auto no-scrollbar">
        {tabs[activeIndex]?.data && (
          <pre>{JSON.stringify(tabs[activeIndex], null, 2)}</pre>
        )}
      </div>
    </>
  );
}
