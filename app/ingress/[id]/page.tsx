'use client';

import React from "react";
import { useIngressById } from "../hooks/useIngressById";

const IngressOrderDetails = ({ params }: { params: { id: string } }) => {
  const { data } = useIngressById(params.id);

  console.log({ data });
  return <div>{params.id}</div>;
};

export default IngressOrderDetails;
