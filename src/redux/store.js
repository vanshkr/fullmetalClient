import { configureStore } from "@reduxjs/toolkit";

import { jikanApi } from "./services/jikanApi";
import { backendApi } from "./services/backendApi";
import playerReducer from "./features/playerSlice";
import watchlistReducer from "./features/watchlistSlice";
import userAuthReducer from "./features/userAuthSlice";

export const store = configureStore({
  reducer: {
    [jikanApi.reducerPath]: jikanApi.reducer,
    [backendApi.reducerPath]: backendApi.reducer,
    player: playerReducer,
    watchlist: watchlistReducer,
    userAuth: userAuthReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jikanApi.middleware, backendApi.middleware),
});
