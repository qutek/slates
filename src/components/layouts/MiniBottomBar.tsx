import SwapLanguage from "@src/components/actions/SwapLanguage";
// import OpenSettings from "@src/components/actions/OpenSettings";
import MoveToMainWindow from "@src/components/actions/MoveToMainWindow";

export default function MiniBottomBar() {
  return (
    <div className="flex gap-1">
      <SwapLanguage tooltipPosition="left" />
      <MoveToMainWindow tooltipPosition="left" />
      {/* <OpenSettings tooltipPosition={false} /> */}
    </div>
  );
}
