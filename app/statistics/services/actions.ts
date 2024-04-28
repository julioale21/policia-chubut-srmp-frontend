import axiosInstance from "@/app/config/axios";

export const getStatistics = async () => {
  const response = await axiosInstance.get("/statistics");
  return response.data;
};
