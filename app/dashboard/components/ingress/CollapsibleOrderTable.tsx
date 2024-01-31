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
} from "@mui/material";
import { OrderListRow } from "./OrderListRow";
import { SearchBar } from "@/app/common/components/SearchBar";

interface CollapsibleOrderTableProps {
  orders: Order[];
  handleSearch: (value: string) => void;
}

const CollapsibleOrderTable: React.FC<CollapsibleOrderTableProps> = ({
  orders,
  handleSearch,
}) => {
  return (
    <Stack direction="column">
      <Stack direction="row" justifyContent="flex-end" marginY={2}>
        <SearchBar onSearch={(value) => handleSearch(value)} />
      </Stack>
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
              <OrderListRow key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export { CollapsibleOrderTable };
