import { configureStore } from "@reduxjs/toolkit";

import { jikanApi } from "./services/jikanApi";
import playerReducer from "./features/playerSlice";

export const store = configureStore({
  reducer: {
    [jikanApi.reducerPath]: jikanApi.reducer,
    player: playerReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jikanApi.middleware),
});
