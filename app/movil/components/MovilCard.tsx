import React from "react";

import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";

import {
  CalendarToday,
  Settings,
  Share,
  Description,
} from "@mui/icons-material";

import { Movil } from "../types";

interface MovilCardProps {
  movil: Movil;
}

const MovilCard: React.FC<MovilCardProps> = ({ movil }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: "600px",
        margin: "20px auto",
        padding: "24px",
        borderRadius: "8px",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  borderRadius: "50%",
                  padding: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Settings /> {/* Replaced TruckIcon with a wrench icon */}
              </Box>
              <Typography variant="h5" fontWeight="bold">
                Vehículo Policial
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CalendarToday fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Updated 2 days ago
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        {[
          { label: "Registro interno", value: movil.internal_register },
          { label: "Dominio", value: movil.domain },
          { label: "Marca", value: movil.brand },
          { label: "Modelo", value: movil.model },
        ].map((item) => (
          <React.Fragment key={item.label}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{item.value}</Typography>
            </Grid>
          </React.Fragment>
        ))}

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={2}>
              <IconButton color="primary">
                <Settings />
              </IconButton>
              <IconButton color="primary">
                <Description />
              </IconButton>
            </Stack>
            <IconButton color="primary">
              <Share />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export { MovilCard };
