import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import loaderReducer from './slices/loader';

const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
  },
});

export default store;
