"use client";
import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import OtherComponent from "../components/OtherComponent";

const DashboardPage: React.FC = () => {
  return (
    <Stack>
      <Typography component="h1">Dashboard</Typography>
      <OtherComponent />  
      <Button variant="outlined" onClick={() => signOut()}>
        Salir
      </Button>
    </Stack>
  );
};

export default DashboardPage;
