import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./css/tailwind.css";
import "./css/app.css";
import configureAppStore from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
const store = configureAppStore()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
