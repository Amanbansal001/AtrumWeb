import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { Provider as StoreProvider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import beforeInit from './beforeInit';
import *  as serviceWorkerRegistration from './serviceWorkerRegistration'
import Store from "./Store/index";

import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './i18n';

beforeInit();
ReactDOM.render(
    <React.StrictMode>
        <StoreProvider store={Store}>
            <Suspense fallback={null}>
                <App />
            </Suspense>
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
serviceWorkerRegistration.unregister();
reportWebVitals();