"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFilterNavOpen: false,
  sort: "",
  filters: {
    collections: "",
    category: "",
    colors: "",
    rating: "",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    onToggleNav(state) {
      state.isFilterNavOpen = !state.isFilterNavOpen;
    },
    onFilterProducts(state, action) {
      state.filters[action.payload.type] === action.payload.value
        ? (state.filters[action.payload.type] = "")
        : (state.filters[action.payload.type] = action.payload.value);
    },
    onSortProducts(state, action) {
      state.sort = state.sort === action.payload ? "" : action.payload;
    },

    onClearFilters(state) {
      state.filters = {
        collections: "",
        category: "",
        colors: "",
        rating: "",
      };
    },
  },
});

export const { onToggleNav, onFilterProducts, onClearFilters, onSortProducts } =
  filterSlice.actions;
export default filterSlice.reducer;

export const getFilters = (store) => store.filterState.filters;
export const getSort = (store) => store.filterState.sort;

export const getNavToggle = (store) => store.filterState.isFilterNavOpen;
