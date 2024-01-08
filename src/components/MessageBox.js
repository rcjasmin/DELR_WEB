/* eslint-disable react/jsx-max-props-per-line */
import { Alert } from "@mui/material";

const MessageBox = ({ severity, message }) => {
  return (
    <Alert severity={severity} variant="filled" sx={{ marginTop: "10px", marginBottom: "10px" }}>
      {message}
    </Alert>
  );
};

export default MessageBox;
