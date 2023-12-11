/* eslint-disable react/jsx-max-props-per-line */
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const Logo = () => {
  const theme = useTheme();
  return (
    <Typography variant="h2" sx={{ textAlign: "center" }}>
      <Box>
        <img
          src="/assets/logos/Logo_DELR.jpeg"
          style={{
            width: "auto", // Maintain the aspect ratio
            height: "auto", // Maintain the aspect ratio
          }}
        />
      </Box>
    </Typography>
  );
};
