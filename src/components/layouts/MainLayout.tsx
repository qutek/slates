import useApp from "@frontend/hooks/useApp";
import TextInput from "@frontend/components/TextInput";
import Copy from "@frontend/components/actions/Copy";
import Undo from "@frontend/components/actions/Undo";
import Redo from "@frontend/components/actions/Redo";
import Pronounce from "@frontend/components/actions/Pronounce";
import ChangeLanguage from "@frontend/components/actions/ChangeLanguage";
import MainTopBar from "@frontend/components/layouts/MainTopBar";
import { useState } from "react";
import { classNames } from "@frontend/utils/common";
import { isEmpty } from "lodash";
import { ReceiptSearch } from "iconsax-react";
import ResultDetails from "./ResultDetails";

export default function MainLayout() {
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const { inputRef, results } = useApp();
  const { mainMeaning, originalText, sPronunciation, ...resultDetails } =
    results;

  return (
    <div className="flex flex-col justify-between h-screen rounded-[16px] bg-base-200 shadow-lg">
      <MainTopBar />
      <main className="grow overflow-auto">
        <div className="grid grid-cols-2 h-full">
          <div className="grid flex-grow h-full overflow-auto">
            <TextInput className="textarea textarea-ghost h-full resize-none bg-base-200 grow text-2xl focus:outline-none focus:border-none no-scrollbar" />
          </div>
          <div className="grid flex-grow h-full overflow-auto bg-base-100">
            <div className="p-3 text-2xl">{mainMeaning}</div>
            {openDetails && <ResultDetails {...resultDetails} />}
          </div>
        </div>
      </main>
      <div className="grid grid-cols-2">
        <div className="flex justify-between p-1 items-center">
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
        <div className="flex justify-between p-1 items-center bg-base-100 rounded-br-2xl">
          <div className="flex gap-1">
            <ChangeLanguage tooltipPosition={false} type="targetLang" />
          </div>
          <div className="flex gap-1">
            <div className="tooltip tooltip-left" data-tip="View Dictionary">
              <span
                onClick={() => setOpenDetails(!openDetails)}
                className={classNames(
                  "btn btn-link btn-xs p-0",
                  openDetails ? "text-success" : "text-base-content",
                  isEmpty(resultDetails) ? "btn-disabled" : ""
                )}
              >
                <ReceiptSearch size={22} />
              </span>
            </div>
            <Copy tooltipPosition="left" text={results?.mainMeaning as string} />
            <Pronounce tooltipPosition="left" />
          </div>
        </div>
      </div>
    </div>
  );
}
