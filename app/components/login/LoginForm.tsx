"use client";
import React, { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//valid email julioromero@policia.chubut.gov.ar
//valid password 1234

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const responseNextAuth = await signIn("credentials", {
      redirect: false,
      email,
      password,
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
      width={400}
    >
      <Stack spacing={2} component="form" width="100%">
        <TextField
          id="eamil"
          label="Email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Contraseña"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="outlined" onClick={handleSubmit}>
          Ingresar
        </Button>

        <Stack mt={3}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push("/")}
            sx={{ fontSize: 10 }}
            size="small"
          >
            Regrasar al home
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginForm;
