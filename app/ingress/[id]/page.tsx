// "use client";

// import React from "react";
// import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
// import { useIngressById } from "../hooks/useIngressById";
// import { getFuelLevel } from "@/app/utils/fuelLevel";

// import CheckIcon from "@mui/icons-material/Check";

// import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
// import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
// import AddRoadIcon from "@mui/icons-material/AddRoad";
// import AtmOutlinedIcon from "@mui/icons-material/AtmOutlined";
// import DateRangeIcon from "@mui/icons-material/DateRange";
// import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
// import PinIcon from "@mui/icons-material/Pin";
// import { CardTechnicalItem } from "../components/CardTechnicalItem";
// import { useNavigate } from "@/app/common/hooks/useNavigate";

// interface EquipementIngress {
//   equipement: {
//     type: string;
//   };
// }

// interface Ingress {
//   id: string;
//   date: string;
//   order_number: string;
//   movil: {
//     internal_register: string;
//     domain: string;
//     brand: string;
//     model: string;
//   };
//   kilometers: number;
//   fuel_level: number;
//   repair_description: string;
//   equipementIngress: EquipementIngress[];
// }

// const IngressOrderDetails = ({ params }: { params: { id: string } }) => {
//   const { data } = useIngressById(params.id);
//   const navigate = useNavigate();
//   if (!data) return null;

//   const ingress: Ingress = data;

//   const date = new Date(ingress?.date);

//   const formattedDate = date.toLocaleDateString("es-ES", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   const handleCloseOrder = () => {
//     navigate(`/egress/create-egress?ingressId=${ingress.id}`);
//   };

//   return (
//     <Stack width="100vw" alignItems="center" justifyContent="center">
//       <Stack mb={6} width="100%" justifyContent="center" alignItems="center">
//         <Stack width="100%" alignItems="center">
//           <Typography variant="h2" color="primary" alignItems="center">
//             Detalle de Ingreso
//           </Typography>
//         </Stack>
//         <Stack
//           paddingY={3}
//           justifyContent="center"
//           alignItems="center"
//           width="100%"
//         >
//           <Box width={400} component="img" src="/assets/police_car.png" />
//         </Stack>

//         <Stack width="100%" alignItems="center" justifyContent="center">
//           <Grid container spacing={2} sx={{ marginX: "auto", paddingX: 3 }}>
//             <Grid item xs={12} sm={4}>
//               <CardTechnicalItem
//                 title="Fecha de ingreso"
//                 textColor="primary"
//                 value={formattedDate}
//                 titleSize={22}
//                 fontSize={20}
//                 icon={<DateRangeIcon color="primary" sx={{ fontSize: 50 }} />}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <CardTechnicalItem
//                 title="Número de orden"
//                 textColor="primary"
//                 value={ingress?.order_number}
//                 titleSize={22}
//                 fontSize={20}
//                 icon={
//                   <ConfirmationNumberIcon
//                     color="primary"
//                     sx={{ fontSize: 50 }}
//                   />
//                 }
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <CardTechnicalItem
//                 title="Movil R.I"
//                 textColor="primary"
//                 titleSize={22}
//                 fontSize={20}
//                 value={ingress?.movil.internal_register}
//                 icon={<PinIcon color="primary" sx={{ fontSize: 50 }} />}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <CardTechnicalItem
//                 title="Marca"
//                 textColor="primary"
//                 titleSize={22}
//                 fontSize={20}
//                 value={`${ingress.movil.brand} ${ingress.movil.model}`}
//                 icon={<TimeToLeaveIcon color="primary" sx={{ fontSize: 50 }} />}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <CardTechnicalItem
//                 title="Dominio"
//                 textColor="primary"
//                 titleSize={22}
//                 fontSize={20}
//                 value={ingress.movil.domain}
//                 icon={<AtmOutlinedIcon color="primary" sx={{ fontSize: 50 }} />}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <CardTechnicalItem
//                 title="Kilometros"
//                 textColor="primary"
//                 titleSize={22}
//                 fontSize={20}
//                 value={`${ingress?.kilometers.toString()} Km`}
//                 icon={<AddRoadIcon color="primary" sx={{ fontSize: 50 }} />}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <CardTechnicalItem
//                 title="Nivel de combustible"
//                 textColor="primary"
//                 titleSize={22}
//                 fontSize={20}
//                 value={getFuelLevel(ingress.fuel_level)}
//                 icon={
//                   <LocalGasStationIcon color="primary" sx={{ fontSize: 50 }} />
//                 }
//               />
//             </Grid>
//           </Grid>
//         </Stack>

//         <Divider sx={{ marginY: 3 }} />

//         <Typography
//           fontSize={24}
//           fontWeight="bold"
//           marginBottom={2}
//           color="primary"
//         >
//           Equipamiento al momento del ingreso
//         </Typography>

//         <Grid container spacing={2} paddingX={6}>
//           {ingress?.equipementIngress.map((equipement, index) => (
//             <Grid item key={index} xs={12} sm={6} md={4}>
//               <Stack direction="row" gap={1}>
//                 <CheckIcon sx={{ color: "green" }} />
//                 <Typography>{equipement.equipement.type}</Typography>
//               </Stack>
//             </Grid>
//           ))}
//         </Grid>
//       </Stack>

//       <Stack my={4}>
//         <Button onClick={handleCloseOrder}>Cerrar orden egreso</Button>
//       </Stack>
//     </Stack>
//   );
// };

// export default IngressOrderDetails;\
"use client";
import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useIngressById } from "../hooks/useIngressById";
import { useNavigate } from "@/app/common/hooks/useNavigate";

import DateRangeIcon from "@mui/icons-material/DateRange";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import AtmOutlinedIcon from "@mui/icons-material/AtmOutlined";
import AddRoadIcon from "@mui/icons-material/AddRoad";
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
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={10} lg={8}>
          <Card raised>
            <CardHeader title="Información del Vehículo" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Stack direction="row" alignItems="center" gap={1} mb={2}>
                    <TimeToLeaveIcon color="primary" />
                    <Typography>Marca y Modelo</Typography>
                  </Stack>
                  <Typography variant="body1">{`${ingress.movil.brand} ${ingress.movil.model}`}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Stack direction="row" alignItems="center" gap={1} mb={2}>
                    <AtmOutlinedIcon color="primary" />
                    <Typography>Dominio</Typography>
                  </Stack>
                  <Typography variant="body1">
                    {ingress.movil.domain}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Stack direction="row" alignItems="center" gap={1} mb={2}>
                    <AddRoadIcon color="primary" />
                    <Typography>Kilómetros</Typography>
                  </Stack>
                  <Typography variant="body1">
                    {`${ingress.kilometers} Km`}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={10} lg={8}>
          <Card raised>
            <CardHeader title="Detalles de la Orden" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    <DateRangeIcon color="primary" /> Fecha de ingreso
                  </Typography>
                  <Typography variant="body1">{formattedDate}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    <ConfirmationNumberIcon color="primary" /> Número de orden
                  </Typography>
                  <Typography variant="body1">
                    {ingress.order_number}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={10} lg={8}>
          <Card raised>
            <CardHeader title="Equipamiento al Momento del Ingreso" />
            <CardContent>
              <Grid container spacing={2}>
                {ingress.equipementIngress.map((equipement, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Stack direction="row" gap={1} alignItems="center">
                      <CheckIcon sx={{ color: "green" }} />
                      <Typography>{equipement.equipement.type}</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={handleCloseOrder}>
        Cerrar orden de egreso
      </Button>
    </Stack>
  );
};

export default IngressOrderDetails;
