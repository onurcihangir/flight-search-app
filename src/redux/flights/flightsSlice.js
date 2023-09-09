import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFlightsAsync = createAsyncThunk(
  "flights/getFlightsAsync",
  async ({ page, sortParam, filters }) => {
    console.log(sortParam);
    console.log(filters);
    const resp = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/flights?_sort=${sortParam}&_order=asc`,
      { params: filters }
    );
    return resp.data;
  }
);

export const flightsSlice = createSlice({
  name: "flights",
  initialState: {
    items: [],
    activeFilters: {},
    sort: "duration",
    isLoading: false,
    isFetched: false,
    error: null,
  },
  reducers: {
    changeActiveFilters: (state, action) => {
      console.log(action.payload);
      state.activeFilters = { ...state.activeFilters, ...action.payload };
      console.log(state.activeFilters);
    },
    changeSort: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: {
    // GET TODO
    [getFlightsAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getFlightsAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.items = action.payload;
    },
    [getFlightsAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export const selectFlights = (state) => state.flights.items;

export const { changeActiveFilters, changeSort } = flightsSlice.actions;
export default flightsSlice.reducer;
