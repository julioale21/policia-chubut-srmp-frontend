import axiosInstance from "@/app/config/axios";
import { Movile } from "@/app/ingress/types";

export const getMoviles = async (): Promise<Movile[]> => {
  const response = await axiosInstance.get<Movile[]>("/moviles");
  return response.data;
};
