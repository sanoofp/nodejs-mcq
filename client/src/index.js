import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";
import muiTheme from "./theme/muiTheme";
import store from "./store";
import * as serviceWorker from './serviceWorker';
import Routes from "./helper/router";
import Layout from "./utils/Layout";

import "./styles/main.scss"
import "bootstrap/dist/css/bootstrap-grid.min.css";

function Main(){
  return (
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <BrowserRouter>
          <Layout>
            <Routes />
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

ReactDOM.render(<Main />, document.getElementById('root'));

serviceWorker.unregister();
