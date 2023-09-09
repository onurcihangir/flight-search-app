import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * The `Error` function is a React component that displays an error message in a Snackbar component.
 * @returns The Error component is returning a Snackbar component from the Material-UI library. The
 * Snackbar component displays a message at the top center of the screen. It is conditionally rendered
 * based on the value of the "open" prop. The Snackbar component has an autoHideDuration of 6000
 * milliseconds, meaning it will automatically close after 6 seconds. The onClose prop is used to
 * handle the close event of
 */
function Error({ open, errorMessage, onClose }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
}

export default Error;
