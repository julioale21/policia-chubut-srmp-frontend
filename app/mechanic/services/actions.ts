import axiosInstance from "@/app/config/axios";

export const fetchMechanics = async () => {
  const { data } = await axiosInstance.get(`/mechanics`);
  return data;
};
