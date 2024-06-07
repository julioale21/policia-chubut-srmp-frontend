"use client";

import React from "react";

import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Divider,
  Stack,
  Box,
  Button,
} from "@mui/material";

import { DirectionsCar, Speed, CalendarMonth, Tag } from "@mui/icons-material";
import { useNavigate } from "@/app/common/hooks/useNavigate";
import { useIngressById } from "../hooks/useIngressById";

interface EquipementIngress {
  equipement: {
    type: string;
  };
}

interface Ingress {
  id: string;
  date: string;
  order_number: string;
  movil: {
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
  const navigate = useNavigate();
  if (!data) return null;

  const ingress: Ingress = data;
  const date = new Date(ingress.date);
  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleCloseOrder = () => {
    navigate(`/egress/create-egress?ingressId=${ingress.id}`);
  };

  return (
    <Stack
      spacing={4}
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", mt: 4, mb: 4 }}
    >
      <Typography variant="h3" gutterBottom>
        Detalle de Ingreso
      </Typography>
      <Card className="w-full max-w-6xl mx-auto rounded-lg shadow-lg px-5">
        <CardContent>
          <Grid container spacing={3}>
            {/* Header Section */}
            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {ingress.movil.brand} {ingress.movil.model}
                  </Typography>
                  <Stack mt={2} direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: "primary.light" }}>
                      <DirectionsCar />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">
                      {ingress.movil.domain}
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Avatar sx={{ bgcolor: "primary.light" }}>
                      <Speed />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">
                      {ingress.kilometers} km
                    </Typography>
                  </Stack>
                </Box>

                <Avatar src="/placeholder.svg" alt="@username" />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* Order Details Section */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" fontWeight="medium">
                Detalle de la orden
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar sx={{ bgcolor: "primary.light" }}>
                  <CalendarMonth />
                </Avatar>
                <Typography variant="body2" color="text.secondary">
                  {formattedDate}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6} justifyContent="center">
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                justifyContent="center"
              >
                <Avatar sx={{ bgcolor: "primary.light" }}>
                  <Tag />
                </Avatar>
                <Typography variant="body2" color="text.secondary">
                  #{ingress.order_number}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* Car Equipment Section */}
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="medium">
                Equipamiento
              </Typography>
            </Grid>

            {ingress.equipementIngress.map((item) => (
              <Grid item xs={12} sm={4} md={4} key={item.equipement.type}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar sx={{ bgcolor: "primary.light" }}></Avatar>
                  <Typography variant="body2">
                    {item.equipement.type}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Stack direction="row" justifyContent="center" mt={4}>
        <Button variant="contained" color="primary" onClick={handleCloseOrder}>
          Cerrar orden de egreso
        </Button>
      </Stack>
    </Stack>
  );
};

export default IngressOrderDetails;
