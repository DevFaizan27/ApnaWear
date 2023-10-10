// searchSlice.js

import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: '',
    searchResults: [],
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchResults: (state, action) => {
      const searchTerm = state.searchTerm.toLowerCase();
      const items = action.payload;

      if (searchTerm === '') {
        state.searchResults = items;
      } else {
        state.searchResults = items.filter((item) =>
          item.data.itemName.toLowerCase().includes(searchTerm)
        );
      }
    },
  },
});

export const { setSearchTerm, setSearchResults } = searchSlice.actions;

export const selectSearchTerm = (state) => state.search.searchTerm;
export const selectSearchResults = (state) => state.search.searchResults;

export default searchSlice.reducer;
