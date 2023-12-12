import axiosInstance from "@/app/config/axios";
import { Movile } from "../types";
import { useQuery } from "@tanstack/react-query";

const getMoviles = async (): Promise<Movile[]> => {
  const response = await axiosInstance.get<Movile[]>("/moviles");
  return response.data;
};

export const useMoviles = () => {
  const { data, isLoading, error, isError } = useQuery<Movile[], Error>({
    queryKey: ["moviles"],
    queryFn: getMoviles,
  });

  return { data, isLoading, error, isError };
};
