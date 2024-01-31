import axiosInstance from "@/app/config/axios";
import { useQuery } from "@tanstack/react-query";

const getIngressOrders = async (
  page = 0,
  limit = 10,
  searchTerm: string | undefined
) => {
  const response = await axiosInstance.get(
    `/ingress?page=${page}&limit=${limit}&searchTerm=${searchTerm}`
  );
  return response.data;
};

export const useIngressOrders = (
  page?: number,
  limit?: number,
  searchTerm?: string
) => {
  const query = useQuery({
    queryKey: ["ingressOrders", page, limit, searchTerm],
    queryFn: () => getIngressOrders(page, limit, searchTerm),
  });

  return query;
};
