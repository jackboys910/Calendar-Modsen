import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Authorization from './Authorization';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Authorization />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
