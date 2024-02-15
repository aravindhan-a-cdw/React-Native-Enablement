import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import loaderReducer from './slices/appState';
import dataReducer from './slices/data';

const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
    data: dataReducer,
  },
});

export default store;
