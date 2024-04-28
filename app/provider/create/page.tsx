import { Stack } from "@mui/material";
import React from "react";
import { ProviderForm } from "../components/ProviderForm";


const CreateProviderPage = () => {
  return (
    <Stack
      width="100%"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <ProviderForm />
    </Stack>
  );
};

export default CreateProviderPage;
