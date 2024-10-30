import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalProvider from "./context/globalContext.jsx";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalProvider>
      <App />
      <Toaster />
    </GlobalProvider>
  </BrowserRouter>
);
