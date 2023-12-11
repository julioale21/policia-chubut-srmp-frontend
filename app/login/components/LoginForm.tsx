"use client";
import React from "react";
import { Button, Stack, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "@/app/common/hooks/useNavigate";
import { useLogIn } from "@/app/login/hooks/useLogIn";

//valid email julioromero@policia.chubut.gov.ar
//valid password 1234

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setEmail, setPassword, handleSubmit } = useLogIn();

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
            onClick={() => navigate("/")}
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
