import React, { createContext, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useSettings from "@hooks/useSettings";

// Define the type for your context value
export interface AppContextValue {
  theme: string;
  setTheme: (theme: string) => void;
}

// Create the context
export const AppContext = createContext<AppContextValue | undefined>(undefined);

const useAppContextValue = () => {
  const { theme, setTheme } = useSettings(
    useShallow((state) => ({ theme: state.theme, setTheme: state.setTheme }))
  );

  return {
    theme,
    setTheme,
  };
};

// Create the provider component
const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useAppContextValue();

  useEffect(() => {
    document.body.setAttribute("data-theme", value?.theme);
  }, [value?.theme]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
