// components/MovilCard.jsx

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions, Button, Box } from "@mui/material";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import DomainIcon from "@mui/icons-material/Domain";
import { Movil } from "../types";

interface MovilCardProps {
  movil: Movil;
}

export const MovilCard: React.FC<MovilCardProps> = ({ movil }) => {
  return (
    <Card sx={{ width: [300, 500, 800], m: 2 }}>
      <Box
        component="img"
        height="140"
        src="/assets/police_car.png"
        alt={movil.model}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <DomainIcon /> ID: {movil.id}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {movil.brand} {movil.model}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <DriveEtaIcon /> Domain: {movil.domain}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <BrandingWatermarkIcon /> Internal Register: {movil.internal_register}
        </Typography>
      </CardContent>
    </Card>
  );
};
