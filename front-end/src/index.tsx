import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "mobx-react";
import RootStore from './store/index'

const store = new RootStore();

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
