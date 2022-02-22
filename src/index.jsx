import React from "react";
import ReactDOM from "react-dom";

import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import App from "./App";

import 'antd/dist/antd.less';
import "./styles/index.scss";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
