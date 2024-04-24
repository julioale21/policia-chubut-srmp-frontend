"use client";
// import React from "react";
// import { Stack, Typography } from "@mui/material";
// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import { useNavigate } from "../common/hooks/useNavigate";

// const DashboardPage: React.FC = () => {
//   const session = useSession();
//   const navigate = useNavigate();

//   if (session.status === "unauthenticated") {
//     navigate("/");
//   }

//   return (
//     <Stack alignItems="center" justifyContent="center">
//       <Typography mt={5} fontSize={32}>
//         Dashboard
//       </Typography>

//       <Link href="/ingress">Ordenes de ingreso</Link>
//       <Link href="/egress">Ordenes de egreso</Link>
//       <Link href="/spare_part/create">Crear nuevo producto</Link>
//       <Link href="/spare_part_order/create">Crear ingreso producto</Link>
//       <Link href="/provider">Lista de Proveedores</Link>
//       <Link href="/provider/create">Crear nuevo Proveedor</Link>
//     </Stack>
//   );
// };

// pages/dashboard.js
import * as React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Link from "next/link";
import { SummaryLinkCard } from "./components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril"],
    datasets: [
      {
        label: "Número de ordenes",
        data: [65, 59, 80, 81],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box sx={{ flexGrow: 1, m: 3, my: 8 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryLinkCard
            href="/vehicles"
            title="Total de vehiculos"
            value={20}
          />

          <SummaryLinkCard
            href="/ingress"
            title="Total ordenes de ingreso"
            value={100}
          />

          <SummaryLinkCard
            href="/egress"
            title="Total ordenes de egreso"
            value={50}
          />

          <SummaryLinkCard
            href="/provider"
            title="Total proveedores"
            value={50}
          />
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ordenes por mes
              </Typography>
              <Bar data={data} options={options} />
            </CardContent>
          </Card>
        </Grid>

        {/* Table */}
        <Grid item xs={12}>
          <Stack my={2} width="100%" direction="row" justifyContent="center">
            <Typography>Ordenes de ingreso del último mes</Typography>
          </Stack>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dominio</TableCell>
                  <TableCell align="right">R.I</TableCell>
                  <TableCell align="right">Stado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { id: 1, type: "Truck", status: "Active" },
                  { id: 2, type: "Sedan", status: "Maintenance" },
                  { id: 3, type: "SUV", status: "Active" },
                ].map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
