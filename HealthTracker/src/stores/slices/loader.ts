import {createSlice} from '@reduxjs/toolkit';
import store from '..';

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isLoading: false,
  },
  reducers: {
    startLoading: state => {
      state.isLoading = true;
    },
    stopLoading: state => {
      state.isLoading = false;
    },
  },
});

export const {startLoading, stopLoading} = loaderSlice.actions;

type RootState = ReturnType<typeof store.getState>;

export const selectIsLoading = (state: RootState) => state.loader.isLoading;

export default loaderSlice.reducer;
