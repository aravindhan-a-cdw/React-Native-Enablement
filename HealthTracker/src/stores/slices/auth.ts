import {createSlice} from '@reduxjs/toolkit';

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

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
