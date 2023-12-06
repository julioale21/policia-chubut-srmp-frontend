"use client";
import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { signOut } from "next-auth/react";

const DashboardPage: React.FC = () => {
  return (
    <Stack>
      <Typography component="h1">Dashboard</Typography>
      <Button variant="outlined" onClick={() => signOut()}>
        Salir
      </Button>
    </Stack>
  );
};

export default DashboardPage;
