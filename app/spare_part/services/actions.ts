import axiosInstance from "@/app/config/axios";

export const getSpareParts = async () => {
  const response = await axiosInstance.get(`/spare-part`);
  const sparePartList: SparePart[] = response.data;
  return sparePartList.filter((sparePart) => sparePart.stock > 0);
};
