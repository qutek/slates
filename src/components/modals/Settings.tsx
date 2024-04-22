import { classNames } from "@frontend/utils/common";
import { map } from "lodash";
import { useState } from "react";
import ThemePicker from "@frontend/components/settings/ThemePicker";
import GeneralSetting from "@frontend/components/settings/GeneralSetting";

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
    <div className="flex flex-col justify-between h-full gap-2">
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
      {SETTING_TABS[activeTab as keyof typeof SETTING_TABS].component}
    </div>
  );
}
