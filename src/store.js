import rootReducer from "./redux/";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "md_root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureAppStore = (defaultState) => {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState: defaultState,
  });

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./redux/", () => store.replaceReducer(rootReducer));
  }

  return store;
};
const store = configureAppStore();
export default store;
