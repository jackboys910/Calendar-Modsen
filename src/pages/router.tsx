import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Authorization from './Authorization';
import Calendar from './Calendar';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Authorization />} />
        <Route path='/calendar' element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
