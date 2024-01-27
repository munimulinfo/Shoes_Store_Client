import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./featuers/auth/authSlice";
import { baseApi } from "./api/baseApi";

//creatge persist config and save on local storage
const persistConfig = {
  key: "auth",
  storage,
};

// this is my authReducer  auth reducer state value rehydret persistedReduce
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

//rootState type declare
export type RootState = ReturnType<typeof store.getState>;
//redux mutation type declare
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
