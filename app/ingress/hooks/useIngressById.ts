import axiosInstance from "@/app/config/axios";
import { useQuery } from "@tanstack/react-query";

const getIngressById = async (id: string) => {
  const response = await axiosInstance.get(`/ingress/${id}`);
  return response.data;
};

export const useIngressById = (id: string) => {
  const query = useQuery({
    queryKey: ["ingressById", id],
    queryFn: () => getIngressById(id),
  });

  return query;
};
