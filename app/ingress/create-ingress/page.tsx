import React from "react";
import { Stack } from "@mui/material";
import { IngresForm } from "../components";

const IngressPage: React.FC = () => {
  return (
    <Stack py={7} width="100%" justifyContent="center" alignItems="center">
      <IngresForm />
    </Stack>
  );
};

export default IngressPage;
