import { Button, Stack, Typography } from "@mui/material";

export interface Item {
  sparePart: SparePart;
  quantity: number;
}

interface OrderItemProps {
  item: Item;
  stock?: number;
  onRemove: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const OrderItem: React.FC<OrderItemProps> = ({
  item,
  onRemove,
  onDecrement,
  onIncrement,
}) => {
  return (
    <Stack border="0.5px solid gray" padding={2} borderRadius={2}>
      <Stack direction="row" gap={2}>
        <Stack flex={1}>
          <Typography>Marca: {item.sparePart.brand}</Typography>
          <Typography>Modelo: {item.sparePart.model}</Typography>
          <Typography>Descripción: {item.sparePart.description}</Typography>
        </Stack>
        <Stack gap={1}>
          <Button onClick={onIncrement} variant="outlined" size="small">
            +
          </Button>
          <Stack
            border="1px solid"
            borderColor="lightblue"
            borderRadius={2}
            alignItems="center"
            justifyContent="center"
          >
            <Typography>{item.quantity}</Typography>
          </Stack>
          <Button onClick={onDecrement} variant="outlined" size="small">
            -
          </Button>
        </Stack>
      </Stack>

      <Stack>
        <Button onClick={onRemove}>Eliminar</Button>
      </Stack>
    </Stack>
  );
};
