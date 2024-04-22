import SwapLanguage from "@src/components/actions/SwapLanguage";
import MoveToMiniWindow from "@src/components/actions/MoveToMiniWindow";
import OpenSettings from "@src/components/actions/OpenSettings";

export default function TopBar() {
  return (
    <div data-tauri-drag-region="true" className="flex justify-between p-2">
      <div className="flex justify-start items-center space-x-1.5 px-2">
        <span className="w-4 h-4 border-2 border-transparent rounded-full cursor-pointer bg-red-400"></span>
        <span className="w-4 h-4 border-2 border-transparent rounded-full cursor-pointer bg-yellow-400"></span>
        <span className="w-4 h-4 border-2 border-transparent rounded-full cursor-pointer bg-green-400"></span>
      </div>
      <div className="flex gap-1">
        <SwapLanguage tooltipPosition="left" />
        <MoveToMiniWindow tooltipPosition="left" />
        <OpenSettings tooltipPosition={false} />
      </div>
    </div>
  );
}
