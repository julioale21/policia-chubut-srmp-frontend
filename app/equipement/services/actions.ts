import axiosInstance from "@/app/config/axios";
import { Equipement } from "@/app/ingress/types";

export const getEquipements = async (): Promise<Equipement[]> => {
  const response = await axiosInstance.get<Equipement[]>("/equipements");
  return response.data;
};
