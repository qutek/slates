import { AppContext, AppContextValue } from "@src/contexts/AppContext";
import { useContext } from "react";

const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};

export default useAppContext;