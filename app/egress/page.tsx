"use client";

import React from "react";
import { Stack, Typography } from "@mui/material";
import { useEgressOrders } from "./hooks/useEgressOrders";
import { EgressOrdersList } from "./components/EgressOrderList";

const EgressPage = () => {
  const { isLoading } = useEgressOrders();

  if (isLoading) {
    return (
      <Stack
        height="100vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Typography component="h2" fontSize={24}>
          Cargando...
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack
      height="100vh"
      width="100%"
      paddingX={[0, 5]}
      alignItems="center"
      paddingTop={5}
    >
      <EgressOrdersList />
    </Stack>
  );
};

export default EgressPage;
