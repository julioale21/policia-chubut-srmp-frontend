import axiosInstance from "@/app/config/axios";
import { Ingress } from "../types";

export const getIngressById = async (id: string) => {
  const response = await axiosInstance.get(`/ingress/${id}`);
  return response.data;
};

export const getIngressOrders = async (
  page = 0,
  limit = 10,
  searchTerm: string | undefined
) => {
  const response = await axiosInstance.get(
    `/ingress?page=${page}&limit=${limit}&searchTerm=${searchTerm}`
  );

  return response.data;
};

export const createIngress = async (ingress: Ingress): Promise<Ingress> => {
  const response = await axiosInstance.post<Ingress>("/ingress", {
    ...ingress,
  });
  return response.data;
};

export const updateIngress = async (ingress: Ingress): Promise<Ingress> => {
  const { id, ...updateData } = ingress;
  const response = await axiosInstance.patch<Ingress>(
    `/ingress/${id}`,
    updateData
  );
  return response.data;
};

export const deletengress = async (id: String): Promise<String> => {
  try {
    await axiosInstance.delete(`/ingress/${id}`);
    return "Ingress deleted successfully";
  } catch (error) {
    return "Error deleting ingress";
  }
};
