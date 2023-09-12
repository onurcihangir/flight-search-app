import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import moment from "moment";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function FlightCard({ flight }) {
  return (
    <Card
      sx={{
        display: "flex",
        width: "150vh",
        flexDirection: "row",
        alignItems: "center",
        boxShadow: "0 2px 4px 2px rgba(0, 0, 0, .3)",
        borderLeft: "5px solid silver",
      }}
    >
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item xs={4} sm={4} md={4}>
          <CardContent>
            <Typography component="div" variant="h5">
              {moment(flight.departure_date).format("DD/MM/YYYY")} -{" "}
              {moment(flight.arrival_date).format("DD/MM/YYYY")}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                padding: "1em 4em 1em",
              }}
            >
              <FlightTakeoffIcon />
              {flight.dept_city + " (" + flight.dept_from + ")"}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                padding: "0 4em",
              }}
            >
              <FlightLandIcon />
              {flight.arr_city + " (" + flight.arr_to + ")"}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <img style={{ width: "75%" }} src={flight.company} alt="airline" />
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <Box>
            Trip Duration:
            <Typography
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="subtitle1"
              color="text.secondary"
              component="div"
              //   sx={{
              //     display: "flex",
              //     flexDirection: "row",
              //     justifyContent: "start",
              //     alignItems: "center",
              //     padding: "0 4em",
              //   }}
            >
              <AccessTimeIcon />
              {flight.duration}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Typography component="div" variant="h5">
            Price: {flight.price + "$"}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default FlightCard;
