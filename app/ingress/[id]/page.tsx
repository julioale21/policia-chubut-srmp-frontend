"use client";

import React from "react";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useIngressById } from "../hooks/useIngressById";
import { getFuelLevel } from "@/app/utils/fuelLevel";

import CheckIcon from "@mui/icons-material/Check";
import { CardTechnicalItem } from "@/app/dashboard/components/ingress";

import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import AtmOutlinedIcon from "@mui/icons-material/AtmOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PinIcon from "@mui/icons-material/Pin";

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
          <Typography variant="h2" color="primary">
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

        <CardTechnicalItem
          title="Fecha de ingreso"
          textColor="primary"
          value={formattedDate}
          icon={<DateRangeIcon color="primary" />}
        />

        <CardTechnicalItem
          title="Número de orden"
          textColor="primary"
          value={ingress?.order_number}
          icon={<ConfirmationNumberIcon color="primary" />}
        />

        <CardTechnicalItem
          title="Movil R.I"
          textColor="primary"
          value={ingress?.movile.internal_register}
          icon={<PinIcon color="primary" />}
        />

        <CardTechnicalItem
          title="Marca"
          textColor="primary"
          value={`${ingress.movile.brand} ${ingress.movile.model}`}
          icon={<TimeToLeaveIcon color="primary" />}
        />

        <CardTechnicalItem
          title="Dominio"
          textColor="primary"
          value={ingress.movile.domain}
          icon={<AtmOutlinedIcon color="primary" />}
        />

        <CardTechnicalItem
          title="Kilometros"
          textColor="primary"
          value={`${ingress?.kilometers.toString()} Km`}
          icon={<AddRoadIcon color="primary" />}
        />

        <CardTechnicalItem
          title="Nivel de combustible"
          textColor="primary"
          value={getFuelLevel(ingress.fuel_level)}
          icon={<LocalGasStationIcon color="primary" />}
        />

        <Divider sx={{ marginY: 3 }} />

        <Typography
          fontSize={24}
          fontWeight="bold"
          marginBottom={2}
          color="primary"
        >
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
