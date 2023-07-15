// Redux Slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watching: [],
  plantowatch: [],
  onhold: [],
  completed: [],
  dropped: [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    add: (state, action) => {
      const { category, item } = action.payload;
      // console.log(category,item);
      state[category].push(item);
    },
    remove: (state, action) => {
      const { category, item } = action.payload;
      state[category] = state[category].filter((i) => i !== item);
    },
  },
});

export const { add, remove } = watchlistSlice.actions;
export default watchlistSlice.reducer;
