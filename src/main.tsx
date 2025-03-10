import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import Router from '@pages/router';

import store from './store/store';

import '@scss/global.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </StrictMode>
);
