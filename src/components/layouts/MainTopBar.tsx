import SwapLanguage from "@frontend/components/actions/SwapLanguage";
import MoveToMiniWindow from "@frontend/components/actions/MoveToMiniWindow";
import OpenSettings from "@frontend/components/actions/OpenSettings";
import { appWindow } from "@tauri-apps/api/window";

export default function TopBar() {
  return (
    <div data-tauri-drag-region="true" className="flex justify-between p-2">
      <div className="flex justify-start items-center space-x-1.5 px-2">
        <span onClick={() => appWindow.close()} className="w-4 h-4 border-2 border-transparent rounded-full cursor-pointer bg-red-400"></span>
        <span onClick={() => appWindow.minimize()} className="w-4 h-4 border-2 border-transparent rounded-full cursor-pointer bg-yellow-400"></span>
        <span onClick={() => appWindow.maximize()} className="w-4 h-4 border-2 border-transparent rounded-full cursor-pointer bg-green-400"></span>
      </div>
      <div className="flex gap-1">
        <SwapLanguage tooltipPosition="left" />
        <MoveToMiniWindow tooltipPosition="left" />
        <OpenSettings tooltipPosition={false} />
      </div>
    </div>
  );
}
