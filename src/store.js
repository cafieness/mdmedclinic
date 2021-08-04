import rootReducer from "./redux/";
import { configureStore } from "@reduxjs/toolkit";


export default function configureAppStore(defaultState){
  const store =  configureStore({
    reducer: rootReducer,
    preloadedState: defaultState
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./redux/', () => store.replaceReducer(rootReducer))
  }

  return store
}
