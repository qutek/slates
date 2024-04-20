import useSettings from "@src/hooks/useSettings";
import { classNames } from "@src/utils/common";
import { LANGUAGES, getLang } from "@src/utils/languages";
import { Translate } from "iconsax-react";
import { map } from "lodash";
import { useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function ChangeLanguage({
  tooltipPosition,
  type,
}: {
  tooltipPosition: string | boolean;
  type: "sourceLang" | "targetLang";
}) {
  const [search, setSearch] = useState<string>("");
  const { setState, ...settings } = useSettings(
    useShallow((state) => ({
      sourceLang: state.sourceLang,
      targetLang: state.targetLang,
      setState: state.setState,
    }))
  );

  const filteredLanguages = useMemo(() => {
    return LANGUAGES.filter(
      (lang) =>
        lang.name.toLowerCase().includes(search.toLowerCase()) &&
        (type !== "targetLang" || lang.key !== "auto")
    );
  }, [type, settings, search]);

  const langData = useMemo(() => {
    return getLang(settings[type]);
  }, [type, settings]);

  const handleSelect = (langKey: string) => {
    const elem = document.activeElement;
    setState({
      [type]: langKey,
    });
    if (elem) {
      (elem as HTMLElement)?.blur();
    }
  };

  return (
    <div
      className={classNames(
        "dropdown dropdown-top",
        tooltipPosition ? "tooltip" : "",
        "top" === tooltipPosition ? "tooltip-top" : "",
        "right" === tooltipPosition ? "tooltip-right" : "",
        "left" === tooltipPosition ? "tooltip-left" : ""
      )}
      data-tip="ChangeLanguage"
    >
      <span
        tabIndex={0}
        role="button"
        className="btn btn-link btn-xs text-primary mt-2"
      >
        <Translate size={20} />
        {langData?.name}
      </span>
      <div
        tabIndex={0}
        className={classNames(
          "card compact dropdown-content z-[1] shadow rounded-box w-64",
          "sourceLang" === type ? "bg-base-100" : "bg-base-200"
        )}
      >
        <div tabIndex={0} className="card-body flex">
          <label className="input input-sm w-full input-bordered flex items-center gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="grow"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <ul className="menu p-0 max-h-60 overflow-y-scroll no-scrollbar flex-col flex-nowrap">
            {map(filteredLanguages, (lang, i) => (
              <li
                onClick={() => handleSelect(lang.key)}
                key={i}
                className="w-full my-[1px]"
              >
                <a
                  className={
                    lang.key === langData?.key
                      ? "bg-base-content bg-opacity-10"
                      : ""
                  }
                >
                  {lang.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
