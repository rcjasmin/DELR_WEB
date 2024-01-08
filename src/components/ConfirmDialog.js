/* eslint-disable react/jsx-max-props-per-line */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";

const ConfirmDialog = ({ message, OnCancel, OnConfirm }) => {
  const [open, setOpen] = useState(false);
  const title = "Confirmation";
  useEffect(() => {
    setOpen(message != null ? true : false);
  }, [message]);

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ textAlign: "center" }}>
        <Box>
          <Typography variant="h5">{title}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">{message}</Typography>
        <Typography variant="subtitle2"></Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" onClick={OnConfirm}>
          OUI
        </Button>
        <Button variant="contained" color="error" onClick={OnCancel}>
          NON
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
