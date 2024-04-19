import useApp from "@src/hooks/useApp";
import {
  ArrowForwardSquare,
  BackSquare,
  Copy,
  CopySuccess,
  DriverRefresh,
  Maximize,
  Setting3,
  Translate,
  VolumeHigh,
} from "iconsax-react";
import TextInput from "@src/components/TextInput";

export default function MainLayout() {
  const { changeToMiniWindow, setOpenModal, undo, redo, results } = useApp();
  return (
    <div className="flex flex-col h-full rounded-[16px] bg-base-200 shadow-lg">
      <div data-tauri-drag-region="true" className="flex justify-between p-2">
        <div className="flex justify-start items-center space-x-1.5 px-2">
          <span className="w-4 h-4 border-2 border-transparent rounded-full cursor-pointer bg-red-400"></span>
          <span className="w-4 h-4 border-2 border-transparent rounded-full cursor-pointer bg-yellow-400"></span>
          <span className="w-4 h-4 border-2 border-transparent rounded-full cursor-pointer bg-green-400"></span>
        </div>
        <div className="flex gap-1">
          <div
            className="tooltip tooltip-left"
            data-tip="Disable auto translate"
          >
            <span className="btn btn-link btn-xs p-0 text-success">
              <DriverRefresh size={22} />
            </span>
          </div>
          <div className="tooltip tooltip-left" data-tip="Use mini window">
            <span
              onClick={() => changeToMiniWindow()}
              className="btn btn-link btn-xs p-0 text-base-content"
            >
              <Maximize size={22} />
            </span>
          </div>
          <div
            onClick={() => setOpenModal("settings")}
            className="btn btn-link btn-xs p-0"
          >
            <Setting3 size={22} />
          </div>
        </div>
      </div>
      <main className="grid grid-cols-2 grow">
        <div className="flex flex-col">
          <TextInput className="textarea textarea-ghost bg-base-200 grow text-2xl focus:outline-none focus:border-none" />
          <div className="flex justify-between p-2">
            <div className="flex gap-1">
              <span
                onClick={() => setOpenModal("source-lang")}
                className="btn btn-link btn-xs text-primary"
              >
                <Translate size={20} />
                Auto Detect
              </span>
            </div>
            <div className="flex gap-1">
              <div className="tooltip tooltip-top" data-tip="Undo">
                <span
                  onClick={() => undo()}
                  className="btn btn-link btn-xs p-0 text-base-content"
                >
                  <BackSquare size={22} />
                </span>
              </div>
              <div className="tooltip tooltip-top" data-tip="Redo">
                <span
                  onClick={() => redo()}
                  className="btn btn-link btn-xs p-0 text-base-content"
                >
                  <ArrowForwardSquare size={22} />
                </span>
              </div>
              <div className="tooltip tooltip-top" data-tip="Copy">
                <span className="btn btn-link btn-xs p-0 text-base-content">
                  <Copy size={22} />
                </span>
              </div>
              <div className="tooltip tooltip-top" data-tip="Pronounce">
                <span className="btn btn-link btn-xs p-0 text-base-content">
                  <VolumeHigh size={22} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-base-100 rounded-br-2xl">
          <div className="grow">
            {results?.mainMeaning}
            {/* <pre>{JSON.stringify({ results }, null, 2)}</pre> */}
          </div>
          <div className="flex justify-between p-2">
            <div className="flex gap-1">
              <span
                onClick={() => setOpenModal("target-lang")}
                className="btn btn-link btn-xs"
              >
                <Translate size={20} />
                Indonesia
              </span>
            </div>
            <div className="flex gap-1">
              <div className="tooltip tooltip-top" data-tip="Copy">
                <span className="btn btn-link btn-xs p-0 text-base-content">
                  <CopySuccess size={22} />
                </span>
              </div>
              <div className="tooltip tooltip-left" data-tip="Pronounce">
                <span className="btn btn-link btn-xs p-0 text-base-content">
                  <VolumeHigh size={22} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
