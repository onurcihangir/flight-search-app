import React from "react";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import FlightCard from "../components/FlightCard";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

function Home() {
  const flights = useSelector((state) => state.flights.items);
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
