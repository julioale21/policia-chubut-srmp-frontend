"use client";
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

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { SummaryLinkCard } from "./components";
import { useSession } from "next-auth/react";
import { useNavigate } from "../common/hooks/useNavigate";
import { useStatistics } from "../statistics/hooks/useStatistics";
import { translateMonthToSpanish } from "../statistics/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const session = useSession();
  const navigate = useNavigate();
  const { data: statistics } = useStatistics();

  console.log({ statistics });

  if (session.status === "unauthenticated") {
    navigate("/");
  }
  const data = {
    labels: [
      translateMonthToSpanish(
        statistics?.ingresses.lastFourMonthsCount[0].month || ""
      ),
      translateMonthToSpanish(
        statistics?.ingresses.lastFourMonthsCount[1].month || ""
      ),
      translateMonthToSpanish(
        statistics?.ingresses.lastFourMonthsCount[2].month || ""
      ),
      translateMonthToSpanish(
        statistics?.ingresses.lastFourMonthsCount[3].month || ""
      ),
    ],
    datasets: [
      {
        label: "Número de ordenes",
        data: [
          statistics?.ingresses.lastFourMonthsCount[0].count,
          statistics?.ingresses.lastFourMonthsCount[1].count,
          statistics?.ingresses.lastFourMonthsCount[2].count,
          statistics?.ingresses.lastFourMonthsCount[3].count,
        ],
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
            value={statistics?.moviles.total || 0}
          />

          <SummaryLinkCard
            href="/ingress"
            title="Total ordenes de ingreso"
            value={statistics?.ingresses.total || 0}
          />

          <SummaryLinkCard
            href="/egress"
            title="Total ordenes de egreso"
            value={statistics?.egresses.total || 0}
          />

          <SummaryLinkCard
            href="/provider"
            title="Total proveedores"
            value={statistics?.providers.total || 0}
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
                {statistics?.ingresses?.lastMothOrders.data.map((ingress) => (
                  <TableRow key={ingress.id}>
                    <TableCell component="th" scope="row">
                      {ingress.movil?.domain}
                    </TableCell>
                    <TableCell align="right">{ingress.movil?.internal_register}</TableCell>
                    <TableCell align="right">{ingress.status}</TableCell>
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
