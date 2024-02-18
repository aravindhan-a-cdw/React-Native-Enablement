import {createSlice} from '@reduxjs/toolkit';
import store from '..';

export const loaderSlice = createSlice({
  name: 'appState',
  initialState: {
    isLoading: false,
    isDrawerOpen: false,
  },
  reducers: {
    startLoading: state => {
      state.isLoading = true;
    },
    stopLoading: state => {
      state.isLoading = false;
    },
    openDrawer: state => {
      state.isDrawerOpen = true;
    },
    closeDrawer: state => {
      state.isDrawerOpen = false;
    },
    resetAppState: state => {
      state.isLoading = false;
      state.isDrawerOpen = false;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  openDrawer,
  closeDrawer,
  resetAppState,
} = loaderSlice.actions;

type RootState = ReturnType<typeof store.getState>;

export const selectIsLoading = (state: RootState) => state.loader.isLoading;
export const selectIsDrawerOpen = (state: RootState) =>
  state.loader.isDrawerOpen;

export default loaderSlice.reducer;
