import axiosInstance from "@/app/config/axios";
import { SparePartOrder } from "../types";

export const createSparePartOrder = async (data: SparePartOrder) => {
  const response = await axiosInstance.post("/spare-part-order", data);
  return response.data;
};
