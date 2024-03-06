import { Button, Stack, Typography } from "@mui/material";
import { createOrderListData } from "../../utils/createOrderListData";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import AtmOutlinedIcon from "@mui/icons-material/AtmOutlined";

import { getFuelLevel } from "@/app/utils/fuelLevel";
import { CardTechnicalItem } from "./CardTechnicalItem";
import { useNavigate } from "@/app/common/hooks/useNavigate";

interface CarTexhnicalSheetProps {
  order: ReturnType<typeof createOrderListData>;
}

const CarTechnicalSheet: React.FC<CarTexhnicalSheetProps> = ({ order }) => {
  const navigate = useNavigate();

  const handleOrderDetails = () => {
    navigate(`/ingress/${order.id}`);
  };

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
        <Button variant="text" color="primary" onClick={handleOrderDetails}>
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

export { CarTechnicalSheet };
