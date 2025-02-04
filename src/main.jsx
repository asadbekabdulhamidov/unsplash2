import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

//global context
import { GlobalContextProvider } from "./context/GlobalContext.jsx";

//toast
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <App />
    <ToastContainer position="bottom-right" />
  </GlobalContextProvider>,
);
