"use client";
import React from "react";

import {
  Box,
  Button,
  Collapse,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
  TableCell,
  Table,
  TablePagination,
} from "@mui/material";

import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useIngressOrders } from "../../../ingress/hooks/useIngressOrders";
import { useNavigate } from "@/app/common/hooks/useNavigate";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";

const IngressOrdersList = () => {
  const { data: orders, isLoading, isError } = useIngressOrders();
  const navigate = useNavigate();

  const handleCreateIngress = () => {
    navigate("/ingress/create-ingress");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!orders) return <div>No orders</div>;

  const rows = orders?.map((order: any) => {
    return createData(
      order.id,
      order.date,
      order.order_number,
      order.repair_description,
      {
        id: order.movile.id,
        brand: order.movile.brand,
        model: order.movile.model,
        domain: order.movile.domain,
        kilometers: order.kilometers,
      }
    );
  });

  return (
    <Stack width="70%">
      <Typography fontSize={26} mx="auto" mb={5} mt={5} component="h2">
        Ordenes de ingreso
      </Typography>
      <CollapsibleTable orders={rows} />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={10}
        page={1}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        labelRowsPerPage="Resultados por pagina"
      />
      <Stack mt={3} width="100%" direction="row" justifyContent="flex-end">
        <Button
          variant="outlined"
          endIcon={<AddOutlinedIcon />}
          onClick={handleCreateIngress}
        >
          Crear orden
        </Button>
      </Stack>
    </Stack>
  );
};

export { IngressOrdersList };

function createData(
  id: string,
  date: string,
  orderNumbre: string,
  repairDescription: string,
  movile: {
    id: string;
    brand: string;
    model: string;
    domain: string;
    kilometers: number;
  }
) {
  return {
    id,
    date,
    orderNumbre,
    repairDescription,
    movile,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {dayjs(row.date).format("DD/MM/YYYY")}
        </TableCell>
        <TableCell align="center">{row.orderNumbre}</TableCell>
        <TableCell align="center">{row.repairDescription}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, paddingY: 3 }}>
              <Typography variant="h6" gutterBottom component="div">
                Móvil
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Marca</TableCell>
                    <TableCell>Modelo</TableCell>
                    <TableCell>Dominio</TableCell>
                    <TableCell>Kilometros</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.movile.id}>
                    <TableCell sx={{ border: "none" }}>
                      {row.movile.brand}
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      {row.movile.model}
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      {row.movile.domain}
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      {row.movile.kilometers} km
                    </TableCell>
                    <TableCell sx={{ border: "none" }}></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ orders }: any) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Fecha de ingreso</TableCell>
            <TableCell align="center">Número de orden</TableCell>
            <TableCell align="center">Descripción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row: any) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
