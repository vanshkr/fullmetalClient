import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAnimes: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeAnime: {},
  genreListId: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveAnime: (state, action) => {
      state.activeAnime = action.payload.song;
      console.log(action.payload);

      //   if (action.payload?.data?.tracks?.hits) {
      //     state.currentSongs = action.payload.data.tracks.hits;
      //   } else if (action.payload?.data?.properties) {
      //     state.currentSongs = action.payload?.data?.tracks;
      //   } else {
      //     state.currentSongs = action.payload.data;
      //   }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      //   if (state.currentSongs[action.payload]?.track) {
      //     state.activeAnime = state.currentSongs[action.payload]?.track;
      //   } else {
      //     state.activeAnime = state.currentSongs[action.payload];
      //   }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      //   if (state.currentSongs[action.payload]?.track) {
      //     state.activeAnime = state.currentSongs[action.payload]?.track;
      //   } else {
      //     state.activeAnime = state.currentSongs[action.payload];
      //   }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const {
  setActiveAnime,
  nextAnime,
  prevAnime,
  playPause,
  selectGenreListId,
} = playerSlice.actions;

export default playerSlice.reducer;
