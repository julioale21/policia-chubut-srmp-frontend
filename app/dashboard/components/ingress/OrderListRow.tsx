import React from "react";
import dayjs from "dayjs";
import { createOrderListData } from "../../utils/createOrderListData";
import { Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import { CarTechnicalSheet } from "./CarTechnicalSheet";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface OrderListRowProps {
  row: ReturnType<typeof createOrderListData>;
}

const OrderListRow: React.FC<OrderListRowProps> = ({ row }) => {
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
        <TableCell align="center">{row.order_number}</TableCell>
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
};

export { OrderListRow };
