'use client';
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const SignInButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/login")}
      sx={{ color: "black", fontWeight: 400 }}
      variant="text"
    >
      Ingresar
    </Button>
  );
};

export default SignInButton;
