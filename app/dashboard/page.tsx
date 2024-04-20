"use client";
import React from "react";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useNavigate } from "../common/hooks/useNavigate";

const DashboardPage: React.FC = () => {
  const session = useSession();
  const navigate = useNavigate();

  if (session.status === "unauthenticated") {
    navigate("/");
  }

  return (
    <Stack alignItems="center" justifyContent="center">
      <Typography mt={5} fontSize={32}>
        Dashboard
      </Typography>

      <Link href="/ingress">Ordenes de ingreso</Link>
      <Link href="/egress">Ordenes de egreso</Link>
    </Stack>
  );
};

export default DashboardPage;
