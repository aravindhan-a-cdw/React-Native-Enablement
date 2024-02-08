import {createSlice} from '@reduxjs/toolkit';
import store from '../index';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggingIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggingIn = true;
    },
    logout: state => {
      state.user = null;
      state.isLoggingIn = false;
    },
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggingIn = (state: RootState) => state.auth.isLoggingIn;

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
