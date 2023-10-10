// itemSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchItemById,fetchItems } from '../Actions/fetchItemAction';




const initialState = {
  items: [],
  status: 'idle',
  error: null,
  currentItem: null,
  userType: ''
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    setUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    deleteItem:(state,action)=>{
      state.items=state.items.filter((items)=>items.index!==action.payload)
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchItemById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addItem,deleteItem } = itemSlice.actions;
export default itemSlice.reducer;
