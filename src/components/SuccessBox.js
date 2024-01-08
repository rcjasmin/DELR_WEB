import { Alert, Snackbar } from "@mui/material";

const SuccessBox = ({ message, onClose }) => {
  return (
    <Snackbar
      open={true}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%", color: "#FFF", fontWeight: "bolder", fontSize: "15px" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessBox;
