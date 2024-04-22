import MainLayout from "./layouts/MainLayout";
import MiniLayout from "./layouts/MiniLayout";
import useApp from "@frontend/hooks/useApp";

export default function App() {
  const { miniWindow } = useApp();
  return miniWindow ? <MiniLayout /> : <MainLayout />;
}
