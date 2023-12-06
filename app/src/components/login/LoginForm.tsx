"use client";
import React from "react";
import { Button, Stack, TextField } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);
  const handleSubmit = async () => {
    const responseNextAuth = await signIn("credentials", {
      redirect: false,
      email: "julioromero@policia.chubut.gov.ar",
      password: "1234",
    });

    if (responseNextAuth?.error) {
      console.log(responseNextAuth.error);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <Stack
      alignItems="center"
      direction="column"
      justifyContent="center"
      mt={5}
      width={300}
    >
      <Stack spacing={2} component="form" width="100%">
        <TextField id="eamil" label="Email" type="text" />
        <TextField id="password" label="Contraseña" type="password" />
        <Button variant="outlined" onClick={handleSubmit}>
          Ingresar
        </Button>
      </Stack>
    </Stack>
  );
};

export default LoginForm;
