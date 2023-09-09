import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import FlightCard from "../components/FlightCard";
import Error from "../components/Error";

function Home() {
  const flights = useSelector((state) => state.flights.items);
  const error = useSelector((state) => state.flights.error);
  //TODO: control for error response for flight request
  //TODO: control for empty flight response
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        paddingTop: "100px",
      }}
    >
      {error && (
        <Error open={error} errorMessage={"Error when fetching flights"} />
      )}
      <Filter />
      <Sort />
      {flights.map((flight) => (
        <Box sx={{ paddingBottom: "10px" }}>
          <FlightCard flight={flight} />
        </Box>
      ))}
    </div>
  );
}

export default Home;
