"use client";

import React from "react";
import { Stack } from "@mui/material";
import EgressOrderForm from "../components/EgressOrderForm";
import { useSearchParams } from "next/navigation";
import { useIngressById } from "@/app/ingress/hooks/useIngressById";
import { useNavigate } from "@/app/common/hooks/useNavigate";

const CreateEgressOrderPage = () => {
  const searchParams = useSearchParams();
  const ingressId = searchParams.get("ingressId");
  const navigate = useNavigate();

  const { data: ingress, isLoading } = useIngressById(ingressId as string);

  if (isLoading) return <div>Loading...</div>;

  if (!isLoading && !ingress) {
    navigate("/ingress");
  }

  return (
    <Stack
      height="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      {ingress && <EgressOrderForm ingress={ingress} />}
    </Stack>
  );
};

export default CreateEgressOrderPage;
