import axiosInstance from "@/app/config/axios";
import { useQuery } from "@tanstack/react-query";

const getIngressOrders = async () => {
  const response = await axiosInstance.get("/ingress");
  return response.data;
};

export const useIngressOrders = () => {
  const query = useQuery({
    queryKey: ["ingressOrders"],
    queryFn: getIngressOrders,
  });

  return query;
};
