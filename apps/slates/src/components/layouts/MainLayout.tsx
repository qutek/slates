import useApp from "@src/hooks/useApp";
import TextInput from "@src/components/TextInput";
import Copy from "@src/components/actions/Copy";
import Undo from "@src/components/actions/Undo";
import Redo from "@src/components/actions/Redo";
import Pronounce from "@src/components/actions/Pronounce";
import ChangeLanguage from "@src/components/actions/ChangeLanguage";
import MainTopBar from "@src/components/layouts/MainTopBar";

export default function MainLayout() {
  const {
    inputRef,
    results,
  } = useApp();
  return (
    <div className="flex flex-col h-full rounded-[16px] bg-base-200 shadow-lg">
      <MainTopBar />
      <main className="grid grid-cols-2 grow">
        <div className="flex flex-col">
          <TextInput className="textarea textarea-ghost bg-base-200 grow text-2xl focus:outline-none focus:border-none" />
          <div className="flex justify-between p-2">
            <div className="flex gap-1">
              <ChangeLanguage tooltipPosition={false} type="sourceLang" />
            </div>
            <div className="flex gap-1">
              <Undo tooltipPosition="top" />
              <Redo tooltipPosition="top" />
              <Copy
                tooltipPosition="top"
                text={inputRef.current?.value as string}
              />
              <Pronounce tooltipPosition="top" />
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-base-100 rounded-br-2xl">
          <div className="grow p-2">
            {results?.mainMeaning}
            {/* <pre>{JSON.stringify({ results }, null, 2)}</pre> */}
          </div>
          <div className="flex justify-between p-2">
            <div className="flex gap-1">
              <ChangeLanguage tooltipPosition={false} type="targetLang" />
            </div>
            <div className="flex gap-1">
              <Copy
                tooltipPosition="top"
                text={results?.mainMeaning as string}
              />
              <Pronounce tooltipPosition="left" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
