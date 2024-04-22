import React from "react";
import { Stack } from "@mui/material";
import { SparePartOrderForm } from "../components";

const CreateSparePartOrderPage = () => {
  return (
    <Stack
      width="100%"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <SparePartOrderForm />
    </Stack>
  );
};

export default CreateSparePartOrderPage;
