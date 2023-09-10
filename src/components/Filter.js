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
  const errorMessage = "Please fill in all fields.";
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.airports.isLoading);
  const requestError = useSelector((state) => state.airports.error);
  const airports = useSelector((state) => state.airports.items);
  const activeFilters = useSelector((state) => state.flights.activeFilters);
  const sortParam = useSelector((state) => state.flights.sort);

  const [oneWay, setOneWay] = useState(false);
  const [fieldsErrors, setFieldsErrors] = React.useState({
    dept_from: false,
    arr_to: false,
    departure_date: false,
    arrival_date: false,
  });

  const [blankFieldsError, setBlankFieldsError] = React.useState(false);

  useEffect(() => {
    dispatch(getAirportsAsync());
  }, [dispatch]);

  const onClick = () => {
    // check if the fields are blank
    let error = false;
    let errors = {
      dept_from: false,
      arr_to: false,
      departure_date: false,
      arrival_date: false,
    };
    if (!activeFilters.dept_from) {
      errors.dept_from = true;
      error = true;
    }
    if (!activeFilters.arr_to) {
      errors.arr_to = true;
      error = true;
    }
    if (!activeFilters.departure_date) {
      errors.departure_date = true;
      error = true;
    }
    if (!oneWay && !activeFilters.arrival_date) {
      errors.arrival_date = true;
      error = true;
    }
    // set fields' error prop
    setFieldsErrors(errors);
    // set state for error snackbar
    setBlankFieldsError(error);

    // if there is not a blank field, then fetch flights
    if (!error) {
      dispatch(getFlightsAsync({ sortParam, filters: activeFilters }));
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setBlankFieldsError(false);
  };

  if (isLoading) {
    return <Loading loading={isLoading} />;
  }

  return (
    <div>
      {(blankFieldsError || requestError) && (
        <Error
          // show error message if there is blank field or fetching error
          open={blankFieldsError || requestError}
          errorMessage={
            blankFieldsError ? errorMessage : "Error when fetching airports"
          }
          onClose={blankFieldsError ? handleClose : null}
        />
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
                    // if oneway is checked then set arrival date to null
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
                <TextField
                  {...params}
                  error={fieldsErrors.dept_from}
                  label="Departing From"
                />
              )}
              onChange={(event, value) => {
                dispatch(
                  changeActiveFilters({ dept_from: value ? value.code : null })
                );
                // if there is an error before set to false
                fieldsErrors.dept_from &&
                  setFieldsErrors({ ...fieldsErrors, dept_from: false });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={5.25} md={5.25}>
            <Autocomplete
              sx={{ width: "100%" }}
              options={airports}
              getOptionLabel={(option) => `(${option.code}) ${option.name}`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={fieldsErrors.arr_to}
                  label="Arriving At"
                />
              )}
              onChange={(event, value) => {
                dispatch(
                  changeActiveFilters({ arr_to: value ? value.code : null })
                );
                // if there is an error before set to false
                fieldsErrors.arr_to &&
                  setFieldsErrors({ ...fieldsErrors, arr_to: false });
              }}
            />
          </Grid>
          <Grid item xs={6} sm={5} md={5}>
            <DatePicker
              sx={{ width: "100%" }}
              label={"Departure Date"}
              slotProps={{
                textField: {
                  error: fieldsErrors.departure_date,
                },
              }}
              onChange={(value) => {
                let dateString = null;
                if (value) {
                  dateString = new Date(value);
                }
                dispatch(
                  changeActiveFilters({
                    departure_date:
                      // control for Invalid Date
                      dateString instanceof Date && !isNaN(dateString)
                        ? moment(dateString).format("YYYY-MM-DD")
                        : null,
                  })
                );
                // if there is an error before set to false
                fieldsErrors.departure_date &&
                  setFieldsErrors({ ...fieldsErrors, departure_date: false });
              }}
            />
          </Grid>
          <Grid item xs={6} sm={5} md={5}>
            <DatePicker
              sx={{ width: "100%" }}
              disabled={oneWay}
              label={"Return Date"}
              slotProps={{
                textField: {
                  error: fieldsErrors.arrival_date,
                },
              }}
              onChange={(value) => {
                let dateString = null;
                if (value) {
                  dateString = new Date(value);
                }
                dispatch(
                  changeActiveFilters({
                    arrival_date:
                      dateString instanceof Date && !isNaN(dateString)
                        ? moment(dateString).format("YYYY-MM-DD")
                        : null,
                  })
                );
                // if there is an error before set to false
                fieldsErrors.arrival_date &&
                  setFieldsErrors({ ...fieldsErrors, arrival_date: false });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <Button
              sx={{
                backgroundColor: "#8E2157",
                borderRadius: "25px",
                ":hover": {
                  backgroundColor: "#5C0931",
                },
              }}
              variant="contained"
              onClick={() => onClick()}
            >
              Search Flights
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Filter;
