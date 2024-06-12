import axiosInstance from "@/app/config/axios";
import { AxiosError } from "axios";

export const getSpareParts = async () => {
  const response = await axiosInstance.get(`/spare-part`);
  const sparePartList: SparePart[] = response.data;
  return sparePartList;
};

export const createSparePart = async (sparePart: SparePart) => {
  try {
    const response = await axiosInstance.post(`/spare-part`, sparePart);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data.message === "spare part code already exists") {
        throw new Error("El repuesto ya existe");
      }
      throw new Error("Error al crear el repuesto");
    } else {
      throw new Error("Error al crear el repuesto");
    }
  }
};

export const deleteSparePart = async (id: string) => {
  try {
    await axiosInstance.delete(`/spare-part/${id}`);
    return "Repuesto eliminado correctamente";
  } catch (error) {
    throw new Error("Error al eliminar el repuesto");
  }
};
