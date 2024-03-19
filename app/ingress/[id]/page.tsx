"use client";

import React from "react";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useIngressById } from "../hooks/useIngressById";
import { getFuelLevel } from "@/app/utils/fuelLevel";

import CheckIcon from "@mui/icons-material/Check";

interface EquipementIngress {
  equipement: {
    type: string;
  };
}

interface Ingress {
  id: string;
  date: string;
  order_number: string;
  movile: {
    internal_register: string;
    domain: string;
    brand: string;
    model: string;
  };
  kilometers: number;
  fuel_level: number;
  repair_description: string;
  equipementIngress: EquipementIngress[];
}

const IngressOrderDetails = ({ params }: { params: { id: string } }) => {
  const { data } = useIngressById(params.id);
  if (!data) return null;

  const ingress: Ingress = data;

  const date = new Date(ingress?.date);

  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Stack width="100%" alignItems="center" justifyContent="center">
      <Stack mb={6}>
        <Stack width="100%" justifyContent="center" alignItems="center">
          <Typography variant="h2" color="blue">
            Detalle de Ingreso
          </Typography>
        </Stack>
        <Stack
          paddingY={3}
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Box width={400} component="img" src="/assets/police_car.png" />
        </Stack>
        <Stack direction="row" gap={1}>
          <Typography fontWeight="bold" color="blue">
            Fecha Ingreso:
          </Typography>
          <Typography>{formattedDate}</Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <Typography fontWeight="bold" color="blue">
            Número de orden:
          </Typography>
          <Typography>{ingress?.order_number}</Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <Typography fontWeight="bold" color="blue">
            Móvil RI:
          </Typography>
          <Typography>{ingress?.movile.internal_register}</Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <Typography fontWeight="bold" color="blue">
            Dominio:
          </Typography>
          <Typography>{ingress?.movile.domain}</Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <Typography fontWeight="bold" color="blue">
            Marca y modelo:
          </Typography>
          <Typography>
            {ingress?.movile.brand} {ingress?.movile.model}
          </Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <Typography fontWeight="bold" color="blue">
            Kilometraje:
          </Typography>
          <Typography>{ingress?.kilometers} Km</Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <Typography fontWeight="bold" color="blue">
            Nivel de combustible:
          </Typography>
          <Typography>{getFuelLevel(ingress?.fuel_level)}</Typography>
        </Stack>
        <Divider sx={{ marginY: 3 }} />
        <Stack direction="row" gap={1}>
          <Typography fontWeight="bold" color="blue">
            Descripción:
          </Typography>
          <Typography>{ingress?.repair_description}</Typography>
        </Stack>

        <Divider sx={{ marginY: 3 }} />

        <Typography fontWeight="bold" marginBottom={2} color="blue">
          Equipamiento al momento del ingreso
        </Typography>

        <Grid container spacing={2}>
          {ingress?.equipementIngress.map((equipement, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Stack direction="row" gap={1}>
                <CheckIcon sx={{ color: "green" }} />
                <Typography>{equipement.equipement.type}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default IngressOrderDetails;
