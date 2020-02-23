import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { Provider } from 'react-redux';
import  'bootstrap/dist/css/bootstrap.css';

import Store from './app/store'

ReactDOM.render(
    <Provider store={Store}>
        <App />
    </Provider>
    , document.getElementById('root'));