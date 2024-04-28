import { Stack, Typography } from "@mui/material";
import React from "react";
import { SparePartForm } from "../components";

const CreateSparePartScreen = () => {
  return (
    <Stack
      minHeight="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Typography>Ingresar repuesto</Typography>
      <SparePartForm />
    </Stack>
  );
};

export default CreateSparePartScreen;
