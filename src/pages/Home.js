import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import FlightCard from "../components/FlightCard";
import Error from "../components/Error";
import Loading from "../components/Loading";

function Home() {
  const flights = useSelector((state) => state.flights.items);
  const error = useSelector((state) => state.flights.error);
  const isFetched = useSelector((state) => state.flights.isFetched);
  const isLoading = useSelector((state) => state.flights.isLoading);

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
      {isLoading && <Loading loading={isLoading} />}
      <Filter />
      <Sort />
      {flights.map((flight) => (
        <Box sx={{ paddingBottom: "10px" }}>
          <FlightCard flight={flight} />
        </Box>
      ))}
      {isFetched && flights.length === 0 && (
        <Typography variant="h5">No flights found</Typography>
      )}
    </div>
  );
}

export default Home;
