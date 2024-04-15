import { equipementService } from "..";
import { Equipement } from "../../ingress/types";
import { useQuery } from "@tanstack/react-query";

export const useEquipements = () => {
  const { data, isLoading, error, isError } = useQuery<Equipement[], Error>({
    queryKey: ["equipements"],
    queryFn: equipementService.getEquipements,
  });

  return { data, isLoading, error, isError };
};
