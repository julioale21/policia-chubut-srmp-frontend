"use client";

import React from "react";
import { IngressForm } from "../../components/form/IngressForm";
import { useIngressById } from "../../hooks/useIngressById";
import { Stack } from "@mui/material";

interface UpdateIngressProps {
  params: {
    id: string;
  };
}

const UpdateIngress: React.FC<UpdateIngressProps> = ({ params }) => {
  const { data: ingress, isLoading } = useIngressById(params.id);
  if (isLoading) return <div>Loading...</div>;
  if (!ingress) return <div>Not found</div>;
  return (
    <Stack
      width="100%"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <IngressForm ingress={ingress} />
    </Stack>
  );
};

export default UpdateIngress;
