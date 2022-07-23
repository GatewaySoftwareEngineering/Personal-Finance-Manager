import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./styles/global.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "./components/layouts/mainLayout";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading</div>}>
          <MainLayout>
            <App />
          </MainLayout>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
