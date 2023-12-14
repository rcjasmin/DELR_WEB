/* eslint-disable react/jsx-max-props-per-line */
import Head from "next/head";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
//import { SettingsNotifications } from "src/sections/settings/settings-notifications";
import { SettingsPassword } from "src/sections/settings/settings-password";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import TabsMenu from "src/components/TabsMenu";
import React, { useEffect, useState } from "react";
import SiteDataTable from "src/components/SiteDataTable";
import IndicateurDataTable from "src/components/IndicateurDataTable";

const Page = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index) => {
    setTabIndex(index);
  };
  return (
    <>
      <Head>
        <title>DELR | Configuration</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="lg">
          <Stack>
            <TabsMenu activeTab={tabIndex} handleTabChange={handleTabChange} />
            {tabIndex ===0 && <SiteDataTable /> }
            {tabIndex ===1 && <IndicateurDataTable /> }
         
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
