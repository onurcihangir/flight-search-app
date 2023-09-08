import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAirportsAsync = createAsyncThunk(
  "airports/getAirportsAsync",
  async () => {
    const resp = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/airports`
    );
    return resp.data;
  }
);

export const airportsSlice = createSlice({
  name: "airports",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    // GET TODO
    [getAirportsAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAirportsAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    [getAirportsAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export const selectAirports = (state) => state.airports.items;

export default airportsSlice.reducer;
