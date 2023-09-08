import { configureStore } from "@reduxjs/toolkit";
import flightsSlice from "./flights/flightsSlice";
import airportsSlice from "./airports/airportsSlice";

export const store = configureStore({
  reducer: {
    flights: flightsSlice,
    airports: airportsSlice,
  },
});
