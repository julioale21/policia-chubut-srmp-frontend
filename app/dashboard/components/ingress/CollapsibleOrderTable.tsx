import { Order } from "@/app/common/interfaces";
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
// import { OrderListRow } from "./OrderListRow";
import { SearchBar } from "@/app/common/components/SearchBar";
import React from "react";
import dayjs from "dayjs";

import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import DriveEtaIcon from "@mui/icons-material/DriveEta";

import { useNavigate } from "@/app/common/hooks/useNavigate";

interface CollapsibleOrderTableProps {
  orders: Order[];
  handleSearch: (value: string) => void;
  searchTerm?: string;
}

const CollapsibleOrderTable: React.FC<CollapsibleOrderTableProps> = ({
  orders,
  handleSearch,
  searchTerm,
}) => {
  return (
    <Stack direction="column">
      <Stack direction="row" justifyContent="flex-end" marginY={2}>
        <SearchBar
          width={["100%", "100%", 400]}
          onSearch={(value) => handleSearch(value)}
          searchTerm={searchTerm}
        />
      </Stack>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                >
                  <CalendarTodayIcon color="primary" />
                  <Typography color="primary">Fecha de ingreso</Typography>
                </Stack>
              </TableCell>

              <TableCell align="center">
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                >
                  <ConfirmationNumberIcon color="primary" />
                  <Typography color="primary">Número de orden</Typography>
                </Stack>
              </TableCell>

              <TableCell align="center">
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                >
                  <DriveEtaIcon color="primary" />
                  <Typography color="primary">Móvil R.I</Typography>
                </Stack>
              </TableCell>

              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {orders.map((row: any) => (
              <OrderListRow key={row.id} row={row} />
            ))} */}
            {orders.map((row: any) => (
              <OrderRow key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export { CollapsibleOrderTable };

const OrderRow = ({ row }: { row: Order }) => {
  const navigate = useNavigate();

  const handleOrderDetails = () => {
    navigate(`/ingress/${row.id}`);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="center" component="th" scope="row">
          {dayjs(row.date).format("DD/MM/YYYY")}
        </TableCell>
        <TableCell align="center">{row.order_number}</TableCell>
        <TableCell align="center">{row.movile.internal_register}</TableCell>
        <TableCell align="center">
          <Tooltip title="Ver detalle">
            <IconButton onClick={handleOrderDetails}>
              <DescriptionIcon color="primary" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Editar">
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Eliminar">
            <IconButton>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
