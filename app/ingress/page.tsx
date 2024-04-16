"use client";
import React from "react";
import { Stack } from "@mui/material";
import { IngressOrdersList } from "./components/IngressOrdersList";

const IngressOrderListPage: React.FC = () => {
  return (
    <Stack alignItems="center" justifyContent="center">
      <IngressOrdersList />
    </Stack>
  );
};

export default IngressOrderListPage;
