import axiosInstance from "@/app/config/axios";
import { Movil } from "@/app/ingress/types";

export const getMoviles = async (): Promise<Movil[]> => {
  const response = await axiosInstance.get<Movil[]>("/moviles");
  return response.data;
};
