import axiosInstance from "@/app/config/axios";

export const getIngressById = async (id: string) => {
  const response = await axiosInstance.get(`/ingress/${id}`);
  return response.data;
};
