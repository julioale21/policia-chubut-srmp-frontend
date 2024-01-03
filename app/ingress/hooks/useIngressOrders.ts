import axiosInstance from "@/app/config/axios";
import { useQuery } from "@tanstack/react-query";

const getIngressOrders = async (page = 0, limit = 10) => {
  const response = await axiosInstance.get(
    `/ingress?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const useIngressOrders = (page?: number, limit?: number) => {
  const query = useQuery({
    queryKey: ["ingressOrders", page, limit],
    queryFn: () => getIngressOrders(page, limit),
  });

  return query;
};
