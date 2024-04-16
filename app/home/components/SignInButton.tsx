"use client";
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "@/app/common/hooks/useNavigate";

const SignInButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/login")}
      sx={{ color: "black", fontWeight: 400 }}
      variant="text"
    >
      Ingresar
    </Button>
  );
};

export { SignInButton };
