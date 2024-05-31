"use client";

import React from "react";
import { useProviders } from "./hooks/useProviders";
import { Stack } from "@mui/material";
import { ProvidersList } from "./components/ProviderList";

const ProvidersPage = () => {
  const { data: providers, isLoading } = useProviders();

  if (isLoading) {
    return (
      <Stack
        width="100%"
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
      >
        Loading...
      </Stack>
    );
  }

  if (!providers || providers.length === 0) {
    return (
      <Stack
        width="100%"
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
      >
        No se encontraron proveedores
      </Stack>
    );
  }

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
