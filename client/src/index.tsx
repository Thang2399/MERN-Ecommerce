import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './store';

// import i18n (needs to be bundled ;)) 
import './i18n' ;
import { ConfigProvider } from 'antd';
import { theme } from '@/theme';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ConfigProvider theme={theme}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ConfigProvider>
    </React.StrictMode>
);
