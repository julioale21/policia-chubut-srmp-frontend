import axiosInstance from "@/app/config/axios";
import { Provider } from "../types";

export const getProviders = async () => {
  const response = await axiosInstance.get(`/provider`);
  const providerList: Provider[] = response.data;
  return providerList;
};

export const createProvider = async (provider: Provider) => {
  const response = await axiosInstance.post(`/provider`, provider);
  return response.data;
};
