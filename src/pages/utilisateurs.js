/* eslint-disable react/jsx-max-props-per-line */
import Head from "next/head";
import { Box, Container, Stack } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import React from "react";
import UtilisateurDataTable from "src/components/UtilisateurDataTable";

const Page = () => {
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
        <Container maxWidth="xl">
          <Stack>
            <UtilisateurDataTable />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
