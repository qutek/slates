import useSettings from "@frontend/hooks/useSettings";
import { THEMES, classNames } from "@frontend/utils/common";
import { useShallow } from "zustand/react/shallow";

export default function ThemePicker() {
  const { theme, setState } = useSettings(
    useShallow((state) => ({
      theme: state.theme,
      setState: state.setState,
    }))
  );
  return (
    <>
      <div className="grow overflow-auto p-2 no-scrollbar">
        <div className="rounded-box grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {THEMES.map((themeName) => (
            <div
              key={themeName}
              onClick={() => setState({ theme: themeName })}
              className={classNames(
                "border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2",
                themeName === theme
                  ? "!outline-base-content"
                  : "outline-transparent"
              )}
            >
              <div
                data-theme={themeName}
                className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
              >
                <div className="grid grid-cols-5 grid-rows-3">
                  <div className="bg-base-200 col-start-1 row-span-2 row-start-1" />
                  <div className="bg-base-300 col-start-1 row-start-3" />
                  <div className="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2">
                    <div className="font-bold">{themeName}</div>
                    <div
                      className="flex flex-wrap gap-1"
                      data-svelte-h="svelte-1kw79c2"
                    >
                      <div className="bg-primary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                        <div className="text-primary-content text-sm font-bold">
                          A
                        </div>
                      </div>
                      <div className="bg-secondary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                        <div className="text-secondary-content text-sm font-bold">
                          A
                        </div>
                      </div>
                      <div className="bg-accent flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                        <div className="text-accent-content text-sm font-bold">
                          A
                        </div>
                      </div>
                      <div className="bg-neutral flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                        <div className="text-neutral-content text-sm font-bold">
                          A
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-2">
        <form method="dialog">
          <button className="btn btn-outline">Close</button>
        </form>
      </div>
    </>
  );
}
