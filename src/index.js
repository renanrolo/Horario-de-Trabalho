import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import  'bootstrap/dist/css/bootstrap.css';
import ReactGA from 'react-ga';

import App from './app/App';
import Store from './app/store'

const TRACKING_ID = "G-WVHZZFPGZX"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

ReactDOM.render(
    <Provider store={Store}>
        <App />
    </Provider>
    , document.getElementById('root'));