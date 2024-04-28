"use client";

import React from "react";
import { useProviders } from "./hooks/useProviders";
import { Stack } from "@mui/material";
import { ProviderCard } from "./components/ProviderCard";
import { ProvidersList } from "./components/ProviderList";

const ProvidersPage = () => {
  const { data: providers } = useProviders();

  return (
    <Stack
      width="100%"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
    >
      {Array.isArray(providers) && <ProvidersList providers={providers} />}
    </Stack>
  );
};

export default ProvidersPage;
