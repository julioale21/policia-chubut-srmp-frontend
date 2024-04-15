"use client";
import React from "react";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";

const DashboardPage: React.FC = () => {
  return (
    <Stack alignItems="center" justifyContent="center">
      <Typography mt={5} fontSize={32}>
        Dashboard
      </Typography>

      <Link href="/ingress">Ingress List</Link>
    </Stack>
  );
};

export default DashboardPage;
