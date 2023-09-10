import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select, MenuItem, Typography } from "@mui/material";
import { changeSort, getFlightsAsync } from "../redux/flights/flightsSlice";

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.flights.sort);
  const activeFilters = useSelector((state) => state.flights.activeFilters);
  const isFetched = useSelector((state) => state.flights.isFetched);

  const handleChange = (event) => {
    dispatch(changeSort(event.target.value));
    if (isFetched) {
      dispatch(
        getFlightsAsync({
          sortParam: event.target.value,
          filters: activeFilters,
        })
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "150vh",
        alignItems: "center",
        justifyContent: "start",
        padding: "20px",
      }}
    >
      <Typography sx={{ paddingRight: "10px" }}>Sort By:</Typography>
      <Select
        sx={{ width: "15%", bgcolor: "white" }}
        value={sort}
        onChange={handleChange}
      >
        <MenuItem value="duration">
          <em>Duration</em>
        </MenuItem>
        <MenuItem value={"price"}>Lowest Price</MenuItem>
        <MenuItem value={"departure_date"}>Departure Date</MenuItem>
        <MenuItem value={"arrival_date"}>Arrival Date</MenuItem>
      </Select>
    </div>
  );
}

export default Sort;
