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
import { SearchBar } from "@/app/common/components/SearchBar";
import React from "react";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import dayjs from "dayjs";
import { EgressOrder } from "../types";

interface EgressOrderTableProps {
  orders: EgressOrder[];
  handleSearch: (value: string) => void;
  searchTerm?: string;
}

const EgressOrderTable: React.FC<EgressOrderTableProps> = ({
  orders,
  handleSearch,
  searchTerm,
}) => {
  //   const prefetchEgress = usePrefetchEgress();

  if (!orders.length) {
    return <Typography>No hay ordenes de egreso</Typography>;
  }

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
                  <CalendarTodayIcon
                    sx={{ fontSize: [15, 35] }}
                    color="primary"
                  />
                  <Typography fontSize={[10, 12]} color="primary">
                    Fecha de ingreso
                  </Typography>
                </Stack>
              </TableCell>

              <TableCell align="center">
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                >
                  <ConfirmationNumberIcon
                    sx={{ fontSize: [15, 35] }}
                    color="primary"
                  />
                  <Typography fontSize={[10, 12]} color="primary">
                    Número de orden
                  </Typography>
                </Stack>
              </TableCell>

              <TableCell align="center">
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                >
                  <DriveEtaIcon sx={{ fontSize: [15, 35] }} color="primary" />
                  <Typography fontSize={[10, 12]} color="primary">
                    Móvil R.I
                  </Typography>
                </Stack>
              </TableCell>

              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell align="center" component="th" scope="row">
                  {dayjs(row.date).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="center">{row.order_number}</TableCell>
                <TableCell align="center">
                  {row.movil.internal_register}
                </TableCell>
                <TableCell align="center">
                  <Stack direction={["column", "column", "row"]}>
                    <Tooltip title="Ver detalle">
                      <IconButton onClick={() => {}}>
                        <DescriptionIcon color="primary" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Editar">
                      <IconButton onClick={() => {}}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Eliminar">
                      <IconButton onClick={() => {}}>
                        <DeleteForeverIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export { EgressOrderTable };
