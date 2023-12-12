import axiosInstance from "@/app/config/axios";
import { Equipement } from "../types";
import { useQuery } from "@tanstack/react-query";

const getEquipements = async (): Promise<Equipement[]> => {
  const response = await axiosInstance.get<Equipement[]>("/equipements");
  return response.data;
};

export const useEquipements = () => {
  const { data, isLoading, error, isError } = useQuery<Equipement[], Error>({
    queryKey: ["equipements"],
    queryFn: getEquipements,
  });

  return { data, isLoading, error, isError };
};
