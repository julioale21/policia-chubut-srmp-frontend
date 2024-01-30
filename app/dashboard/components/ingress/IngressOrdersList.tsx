"use client";
import React, { ChangeEvent, useState } from "react";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import AtmOutlinedIcon from "@mui/icons-material/AtmOutlined";

export interface Order {
  id: string;
  date: string;
  kilometers: number;
  repair_description: string;
  order_number: string;
  fuel_level: number;
  movile: Movile;
}

export interface Movile {
  id: string;
  internal_register: string;
  domain: string;
  brand: string;
  model: string;
}

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
  SvgIconTypeMap,
} from "@mui/material";

import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useIngressOrders } from "../../../ingress/hooks/useIngressOrders";
import { useNavigate } from "@/app/common/hooks/useNavigate";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
import { parse } from "path";

function getFuelLevel(value: number) {
  if (value > 0 && value <= 10) {
    return "Reserva";
  } else if (value <= 25) {
    return "1/4";
  } else if (value <= 50) {
    return "1/2";
  } else if (value <= 75) {
    return "3/4";
  } else if (value <= 100) {
    return "Lleno";
  } else {
    return "Invalid input";
  }
}

export const IngressOrdersList = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, isLoading, isError } = useIngressOrders(page, limit);
  const navigate = useNavigate();

  const handleCreateIngress = () => {
    navigate("/ingress/create-ingress");
  };

  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    setLimit(parseInt(event.target.value, 10));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!data.ingresses) return <div>No orders</div>;

  const rows = data.ingresses?.map((order: Order) => {
    return createData(
      order.id,
      order.date,
      order.order_number,
      order.repair_description,
      order.fuel_level.toString(),
      {
        id: order.movile.id,
        brand: order.movile.brand,
        model: order.movile.model,
        domain: order.movile.domain,
        internal_register: order.movile.internal_register,
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
        count={data.total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        labelRowsPerPage="Resultados por pagina"
      />
      <Stack
        mt={3}
        mb={10}
        width="100%"
        direction="row"
        justifyContent="flex-end"
      >
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

function createData(
  id: string,
  date: string,
  orderNumbre: string,
  repairDescription: string,
  fuelLevel: string,
  movile: {
    id: string;
    brand: string;
    model: string;
    domain: string;
    internal_register: string;
    kilometers: number;
  }
) {
  return {
    id,
    date,
    orderNumbre,
    repairDescription,
    fuelLevel,
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
        <TableCell align="center">{row.movile.internal_register}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <CarTechnicalSheet order={row} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const CollapsibleTable = ({ orders }: any) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Fecha de ingreso</TableCell>
            <TableCell align="center">Número de orden</TableCell>
            <TableCell align="center">Móvil R.I</TableCell>
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
};

interface CarTexhnicalSheetProps {
  order: ReturnType<typeof createData>;
}

export const CarTechnicalSheet: React.FC<CarTexhnicalSheetProps> = ({
  order,
}) => {
  console.log({ order });
  return (
    <Stack paddingX={3} paddingY={2} gap={1}>
      <Stack direction="row" justifyContent="space-between">
        <Typography flex={1} fontSize={20} fontWeight="bold">
          Móvil
        </Typography>
        <Typography flex={1} fontSize={20} fontWeight="bold">
          Descripción de la reparación
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Stack gap={2} flex={1}>
          <CardTechnicalItem
            title="Marca"
            value={order.movile.brand}
            icon={<TimeToLeaveIcon />}
          />
          <CardTechnicalItem
            title="Modelo"
            value={order.movile.model}
            icon={<TimeToLeaveIcon />}
          />
          <CardTechnicalItem
            title="Dominio"
            value={order.movile.domain}
            icon={<AtmOutlinedIcon />}
          />
          <CardTechnicalItem
            title="Kilometros"
            value={order.movile.kilometers.toString()}
            icon={<AddRoadIcon />}
          />
          <CardTechnicalItem
            title="Nivel de combustible"
            value={getFuelLevel(parseInt(order.fuelLevel))}
            icon={<LocalGasStationIcon />}
          />
        </Stack>
        <Stack flex={1} alignItems="flex-start">
          <Typography textAlign="left" fontWeight="light" fontStyle="italic">
            {order.repairDescription}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="flex-end" gap={1}>
        <Button variant="text" color="primary">
          Ver
        </Button>
        <Button variant="text" color="primary">
          Editar
        </Button>
        <Button variant="text" color="warning">
          Eliminar
        </Button>
      </Stack>
    </Stack>
  );
};

interface CardTechnicalItemProps {
  icon?: React.ReactNode;
  title?: string;
  value?: string;
}

const CardTechnicalItem: React.FC<CardTechnicalItemProps> = ({
  icon,
  title,
  value,
}) => {
  return (
    <Stack direction="row" gap={2}>
      {icon}
      <Typography fontWeight="bold" display="inline">
        {title}:
      </Typography>
      <Typography
        display="initial"
        component="span"
        fontWeight="light"
        fontStyle="italic"
      >
        {value}
      </Typography>
    </Stack>
  );
};
