import { Stack, Typography } from "@mui/material";
import React from "react";
import EgressOrderForm from "../components/EgressOrderForm";

const CreateEgressOrderPage = () => {
  return (
    <Stack
      height="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <EgressOrderForm />
    </Stack>
  );
};

export default CreateEgressOrderPage;
