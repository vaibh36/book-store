import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "../src/store";
import { TranslationProvider } from "./context/TranslationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </Provider>
);
