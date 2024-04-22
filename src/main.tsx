import React from "react";
import ReactDOM from "react-dom/client";
import AppProvider from "@src/contexts/AppContext";
// import App from "./App";
import App from "@components/App";
import "./styles/styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
