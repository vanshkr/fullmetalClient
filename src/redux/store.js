import { configureStore } from "@reduxjs/toolkit";

import { jikanApi } from "./services/jikanApi";
import { backendApi } from "./services/backendApi";

import watchlistReducer from "./features/watchlistSlice";
import userAuthReducer from "./features/userAuthSlice";

export const store = configureStore({
  reducer: {
    [jikanApi.reducerPath]: jikanApi.reducer,
    [backendApi.reducerPath]: backendApi.reducer,

    watchlist: watchlistReducer,
    userAuth: userAuthReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jikanApi.middleware, backendApi.middleware),
});
