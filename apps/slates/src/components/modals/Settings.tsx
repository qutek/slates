import { classNames } from "@src/utils/common";
import { map } from "lodash";
import { useState } from "react";
import ThemePicker from "@src/components/settings/ThemePicker";
import GeneralSetting from "@src/components/settings/GeneralSetting";

const SETTING_TABS = {
  general: {
    label: "General",
    component: <GeneralSetting />,
  },
  themes: {
    label: "Themes",
    component: <ThemePicker />,
  },
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState<string>("general");
  return (
    <div className="min-h-full flex flex-col">
      <div role="tablist" className="tabs tabs-boxed">
        {map(SETTING_TABS, (tab, id) => (
          <a
            key={id}
            onClick={() => setActiveTab(id)}
            role="tab"
            className={classNames("tab", id === activeTab ? "tab-active" : "")}
          >
            {tab.label}
          </a>
        ))}
      </div>
      <div role="tab-content" className="py-3 grow flex flex-col justify-between">
        {SETTING_TABS[activeTab as keyof typeof SETTING_TABS].component}
      </div>
    </div>
  );
}
