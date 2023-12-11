import React from "react";
import { Stack, Typography } from "@mui/material";
import { IngresForm } from "../components";

const IngressPage: React.FC = () => {
  return (
    <Stack width="100%" justifyContent="center" alignItems="center">
      <Typography>Crear orden de ingreso</Typography>
      <IngresForm />
    </Stack>
  );
};

export default IngressPage;
