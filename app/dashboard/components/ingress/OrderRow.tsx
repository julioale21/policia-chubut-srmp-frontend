import React from "react";
import { useNavigate } from "@/app/common/hooks/useNavigate";
import { Order } from "@/app/common/interfaces";
import { IconButton, Stack, TableCell, TableRow, Tooltip } from "@mui/material";
import dayjs from "dayjs";

import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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
          <Stack direction={["column", "column", "row"]}>
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
          </Stack>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export { OrderRow };
