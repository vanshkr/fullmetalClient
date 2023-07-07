import { configureStore } from "@reduxjs/toolkit";

import { jikanApi } from "./services/jikanApi";
import {backendApi } from "./services/backendApi";
import playerReducer from "./features/playerSlice";

export const store = configureStore({
  reducer: {
    [jikanApi.reducerPath]: jikanApi.reducer,
    [backendApi.reducerPath]: backendApi.reducer,
    player: playerReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jikanApi.middleware,backendApi.middleware),
});
