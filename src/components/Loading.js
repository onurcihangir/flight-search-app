import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

/**
 * The function `Loading` returns a loading spinner component wrapped in a backdrop component.
 * @param loading - A boolean value indicating whether the loading component should be displayed or
 * not.
 * @returns a JSX element that consists of a Backdrop component and a CircularProgress component. The
 * Backdrop component is rendered with the "open" prop set to the value of the "loading" parameter, and
 * it has some styling applied to it. The CircularProgress component is rendered inside the Backdrop
 * component and is colored with the "inherit" color.
 */
function Loading(loading) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loading;
