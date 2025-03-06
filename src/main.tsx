import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Router from '@pages/router';

import '@scss/global.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
