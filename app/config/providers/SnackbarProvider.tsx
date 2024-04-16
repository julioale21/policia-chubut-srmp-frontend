"use client";

import React from "react";
import { SnackbarProvider } from "notistack";

interface SnackbarProviderClientProps {
  children: React.ReactNode;
}

const SnackbarProviderClient: React.FC<SnackbarProviderClientProps> = ({
  children,
}) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default SnackbarProviderClient;
