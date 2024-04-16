import React from "react";
import { Stack } from "@mui/material";
import { IngressForm } from "../components/form/IngressForm";

const IngressPage: React.FC = () => {
  return (
    <Stack py={7} width="100%" justifyContent="center" alignItems="center">
      <IngressForm />
    </Stack>
  );
};

export default IngressPage;
