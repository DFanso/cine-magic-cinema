import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./components/reducers";
import App from "./App";

const store = createStore(rootReducer);

const root = document.getElementById("root");
const rootElement = createRoot(root);

rootElement.render(
  <Provider store={store}>
    <App />
  </Provider>
);
