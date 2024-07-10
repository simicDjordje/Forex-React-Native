import { configureStore } from '@reduxjs/toolkit';
import { apiCore } from './services/apiCore';
import authReducer from './features/authSlice';



export const store = configureStore({
  reducer: {
    [apiCore.reducerPath] : apiCore.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiCore.middleware),
})

