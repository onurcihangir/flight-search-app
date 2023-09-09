import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAirportsAsync } from "../redux/airports/airportsSlice";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import {
  changeActiveFilters,
  getFlightsAsync,
} from "../redux/flights/flightsSlice";
import Loading from "./Loading";
import Error from "./Error";

function Filter() {
  const dispatch = useDispatch();
  // TODO: validation for every field
  const isLoading = useSelector((state) => state.airports.isLoading);
  const error = useSelector((state) => state.airports.error);
  const airports = useSelector((state) => state.airports.items);
  const activeFilters = useSelector((state) => state.flights.activeFilters);
  const sortParam = useSelector((state) => state.flights.sort);

  const [oneWay, setOneWay] = useState(false);

  useEffect(() => {
    dispatch(getAirportsAsync());
  }, [dispatch]);

  const onClick = () => {
    dispatch(getFlightsAsync({ sortParam, filters: activeFilters }));
  };

  if (isLoading) {
    return <Loading loading={isLoading} />;
  }

  return (
    <div>
      {error && (
        <Error open={error} errorMessage={"Error when fetching airports"} />
      )}
      <Paper
        elevation={3}
        sx={{
          width: "150vh",
        }}
      >
        <Grid container spacing={2} sx={{ padding: 2, alignItems: "center" }}>
          <Grid item xs={2} sm={1.5} md={1.5}>
            <FormControlLabel
              sx={{
                width: "30vh",
              }}
              control={
                <Checkbox
                  checked={oneWay}
                  onChange={() => {
                    const checked = !oneWay;
                    setOneWay(checked);
                    if (checked) {
                      dispatch(
                        changeActiveFilters({
                          arrival_date: null,
                        })
                      );
                    }
                  }}
                />
              }
              label="One Way"
            />
          </Grid>
          <Grid item xs={10} sm={5.25} md={5.25}>
            <Autocomplete
              sx={{ width: "100%" }}
              options={airports}
              getOptionLabel={(option) => `(${option.code}) ${option.name}`}
              renderInput={(params) => (
                <TextField {...params} label="Departing From" />
              )}
              onChange={(event, value) =>
                dispatch(changeActiveFilters({ dept_from: value.code }))
              }
            />
          </Grid>
          <Grid item xs={12} sm={5.25} md={5.25}>
            <Autocomplete
              sx={{ width: "100%" }}
              options={airports}
              getOptionLabel={(option) => `(${option.code}) ${option.name}`}
              renderInput={(params) => (
                <TextField {...params} label="Arriving At" />
              )}
              onChange={(event, value) =>
                dispatch(changeActiveFilters({ arr_to: value.code }))
              }
            />
          </Grid>
          <Grid item xs={6} sm={5} md={5}>
            <DatePicker
              sx={{ width: "100%" }}
              label={"Departure Date"}
              onChange={(value) => {
                let dateString = null;
                if (value) {
                  dateString = new Date(value);
                }
                dispatch(
                  changeActiveFilters({
                    departure_date: moment(dateString).format("YYYY-MM-DD"),
                  })
                );
              }}
            />
          </Grid>
          <Grid item xs={6} sm={5} md={5}>
            <DatePicker
              sx={{ width: "100%" }}
              disabled={oneWay}
              label={"Return Date"}
              onChange={(value) => {
                let dateString = null;
                if (value) {
                  dateString = new Date(value);
                }
                dispatch(
                  changeActiveFilters({
                    arrival_date: moment(dateString).format("YYYY-MM-DD"),
                  })
                );
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <Button variant="contained" onClick={() => onClick()}>
              Search Flights
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Filter;
