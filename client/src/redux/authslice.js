import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
  name: "auth",
  initialState: {
    name: "",
    email: "",
    password: "",
    isloading: false,
    token: null,
    isAuthenticated: false,
    user: null, // stores { name, email, freeCount }
  },
  reducers: {
    setname: (state, action) => {
      state.name = action.payload;
    },
    setemail: (state, action) => {
      state.email = action.payload;
    },
    setpassword: (state, action) => {
      state.password = action.payload;
    },
    setloading: (state, action) => {
      state.isloading = action.payload;
    },

    // ✅ Store login data (including freeCount)
    setLoginData: (state, action) => {
      state.token = action.payload.token || null;
      state.isAuthenticated = true;

      // Merge name/email/freeCount
      state.user = {
        ...action.payload.user,
        freeCount: action.payload.freeCount ?? action.payload.user?.freeCount ?? 0,
      };
    },

    // ✅ Update free count after /genpaper
    setFreeCount: (state, action) => {
      if (state.user) {
        state.user.freeCount = action.payload;
      }
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setname,
  setemail,
  setpassword,
  setloading,
  setLoginData,
  setFreeCount,
  logout,
} = authslice.actions;

export default authslice.reducer;
