import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import  'bootstrap/dist/css/bootstrap.css';
import ReactGA from 'react-ga';

import App from './app/App';
import Store from './app/store'

const TRACKING_ID = "G-WVHZZFPGZX";
ReactGA.initialize(TRACKING_ID, {
    gaOptions: {
        cookieFlags: "SameSite=None; Secure",
        cookieDomain: "renanrolo.github.io"
    }
});

ReactDOM.render(
    <Provider store={Store}>
        <App />
    </Provider>
    , document.getElementById('root'));