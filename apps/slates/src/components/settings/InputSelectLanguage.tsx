import { Fragment, useMemo, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Global } from "iconsax-react";
import { LANGUAGES } from "@src/utils/languages";
import { find } from "lodash";

interface InputSelectLanguageProps {
  value: string;
  onChange: (value: any) => void;
}

export default function InputSelectLanguage(props: InputSelectLanguageProps) {
  const [query, setQuery] = useState("");

  const value = useMemo(() => {
    return find(LANGUAGES, { key: props.value });
  }, [props.value]);

  const filteredData =
    query === ""
      ? LANGUAGES
      : LANGUAGES.filter((lang) =>
          lang.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox value={value} onChange={(lang) => props.onChange(lang.key)}>
      <div className="relative">
        <Combobox.Input
          className="input input-bordered input-md w-full max-w-xs"
          displayValue={(person: { name: string }) => person.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <Global className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="z-50 absolute mt-2 max-h-60 w-full overflow-auto rounded-md bg-base-100 py-1 shadow-lg ring-1 focus:outline-none">
            {filteredData.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2">
                Nothing found.
              </div>
            ) : (
              filteredData.map((lang) => (
                <Combobox.Option
                  key={lang.key}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-1 pl-10 pr-4 ${
                      active ? "bg-base-200" : ""
                    }`
                  }
                  value={lang}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {lang.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "" : "text-primary"
                          }`}
                        >
                          <Global />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
