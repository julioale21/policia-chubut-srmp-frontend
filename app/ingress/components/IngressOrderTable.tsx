import { Order } from "@/app/common/interfaces";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { SearchBar } from "@/app/common/components/SearchBar";
import React from "react";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import { OrderRow } from "./OrderRow";


interface IngressOrderTableProps {
  orders: Order[];
  handleSearch: (value: string) => void;
  searchTerm?: string;
}

const IngressOrderTable: React.FC<IngressOrderTableProps> = ({
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

export { IngressOrderTable };
