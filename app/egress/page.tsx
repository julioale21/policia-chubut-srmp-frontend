import { Stack, Typography } from "@mui/material";
import React from "react";

const EgressPage = () => {
  return (
    <Stack
      height="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Typography component="h2" fontSize={24}>
        Lista de ordenes de egreso
      </Typography>
    </Stack>
  );
};

export default EgressPage;
