import axiosInstance from "@/app/config/axios";
import { CreateEgressDto, EgressOrder } from "../types";

export const getEgressOrders = async (
  page = 0,
  limit = 10,
  searchTerm: string | undefined
) => {
  const { data } = await axiosInstance.get(
    `/egress?page=${page}&limit=${limit}&searchTerm=${searchTerm}`
  );

  return data;
};

export const createEgress = async (
  egress: CreateEgressDto
): Promise<EgressOrder> => {
  const response = await axiosInstance.post<EgressOrder>("/egress", {
    ...egress,
  });
  return response.data;
};
