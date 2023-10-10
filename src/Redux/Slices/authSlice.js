// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchUserByUid } from '../Actions/fetchUserByUid';


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
     setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers:(builder)=>{
    builder
    .addCase(fetchUserByUid.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchUserByUid.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.currentUser = action.payload;
    })
    .addCase(fetchUserByUid.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
  }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
