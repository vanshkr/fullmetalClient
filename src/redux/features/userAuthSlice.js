import { createSlice } from "@reduxjs/toolkit";
import { AES, enc } from "crypto-js";

// Encryption key (keep it secret and secure)
const encryptionKey = import.meta.env.VITE_ENCRYPTION_KEY;
const initialState = {
  userData: null,
};

const getUserDataFromLocalStorage = () => {
  const encryptedData = localStorage.getItem("profile");
  if (encryptedData) {
    try {
      const decrypted = AES.decrypt(encryptedData, encryptionKey);
      const decryptedStr = decrypted.toString(enc.Utf8);

      if (!decryptedStr) {
        console.warn(
          "Decryption failed — possibly due to invalid key or data."
        );
        return null;
      }

      return JSON.parse(decryptedStr);
    } catch (error) {
      console.error("Decryption error:", error);
      return null;
    }
  }

  return null;
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      const { data } = action.payload;
      const sensitiveData = {
        name: data?.result?.name,
        email: data?.result?.email,
        id: data?.result?._id,
        token: data?.token,
      };
      const encryptedData = AES.encrypt(
        JSON.stringify(sensitiveData),
        encryptionKey
      ).toString();
      localStorage.setItem("profile", encryptedData);
      state.userData = data;
    },
    logout: (state) => {
      localStorage.clear();
      state.userData = null;
    },
    loadUserDataFromLocalStorage: (state, action) => {
      const data = getUserDataFromLocalStorage();
      state.userData = data;
    },
  },
});

export const { authenticate, logout, loadUserDataFromLocalStorage } =
  userAuthSlice.actions;

export default userAuthSlice.reducer;
