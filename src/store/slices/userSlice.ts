import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

const initialState: IUserState = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUserState>) => action.payload,
    removeUser: () => initialState,
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
