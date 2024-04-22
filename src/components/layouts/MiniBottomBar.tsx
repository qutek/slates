import SwapLanguage from "@frontend/components/actions/SwapLanguage";
// import OpenSettings from "@frontend/components/actions/OpenSettings";
import MoveToMainWindow from "@frontend/components/actions/MoveToMainWindow";

export default function MiniBottomBar() {
  return (
    <div className="flex gap-1">
      <SwapLanguage tooltipPosition="left" />
      <MoveToMainWindow tooltipPosition="left" />
      {/* <OpenSettings tooltipPosition={false} /> */}
    </div>
  );
}
