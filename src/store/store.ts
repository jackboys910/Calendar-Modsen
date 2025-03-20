import { configureStore } from '@reduxjs/toolkit';

import eventReducer from './slices/eventSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
