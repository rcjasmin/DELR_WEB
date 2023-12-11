/* eslint-disable react/jsx-max-props-per-line */
import * as React from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

const TabsMenu = ({ activeTab, handleTabChange }) => {
  const handleChange = (event, newValue) => {
    handleTabChange(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Tabs value={activeTab} onChange={handleChange} centered>
          <Tab
            sx={{
              fontSize: {
                xs: 9, // Adjust font size for extra small screens
                sm: 10, // Adjust font size for small screens
                md: 11, // Default font size for medium and larger screens
                lg: 13,
              },
            }}
            label="Organisation Unit - Sites"
          />
          <Tab
            sx={{
              fontSize: {
                xs: 9, // Adjust font size for extra small screens
                sm: 10, // Adjust font size for small screens
                md: 11, // Default font size for medium and larger screens
                lg: 13,
              },
            }}
            label="Data Element - Indicateurs"
          />
        </Tabs>
      </Box>
      {/* <ButtonAdd /> */}
    </Box>
  );
};

export default TabsMenu;
