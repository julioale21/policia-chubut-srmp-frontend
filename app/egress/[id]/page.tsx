import { Stack, Typography } from "@mui/material";
import React from "react";

const EgressOrderDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <Stack
      height="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Typography component="h2" fontSize={24}>
        Orden de egreso id: {params.id}
      </Typography>
    </Stack>
  );
};

export default EgressOrderDetailsPage;
