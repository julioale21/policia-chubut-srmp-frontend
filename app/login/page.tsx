import React from "react";
import { Stack, Typography } from "@mui/material";
import LoginForm from "../components/login/LoginForm";

const LoginPage = () => {
  return (
    <Stack
      direction="column"
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h1" fontSize={{ xs: 36, md: 48 }}>
        Policia del Chubut
      </Typography>
      <LoginForm />
    </Stack>
  );
};

export default LoginPage;
