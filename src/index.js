import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./css/tailwind.css";
import "./css/app.css";
import store from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { QueryClient, QueryClientProvider } from "react-query";
import { GuardProvider } from "react-router-guards";
import { adminGuard } from "./components/router/Routes";
import { ErrorPage } from "./pages";
import { Loading } from "./components";
const queryClient = new QueryClient();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GuardProvider
            guards={[adminGuard]}
            error={ErrorPage}
            loading={Loading}
          >
            <App />
          </GuardProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
