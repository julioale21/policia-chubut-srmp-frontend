import axiosInstance from "@/app/config/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { Ingress } from "../types";

const updateIngress = async (ingress: Ingress): Promise<Ingress> => {
  const { id, ...updateData } = ingress;
  const response = await axiosInstance.patch<Ingress>(
    `/ingress/${id}`,
    updateData
  );
  return response.data;
};

export const useMutateUpdateIngress = () => {
  const mutationOptions: UseMutationOptions<Ingress, Error, Ingress> = {
    mutationFn: updateIngress,
  };

  const mutation = useMutation<Ingress, Error, Ingress>(mutationOptions);

  return mutation;
};
