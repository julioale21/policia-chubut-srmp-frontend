import axiosInstance from "@/app/config/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { Ingress } from "../types";

const createIngress = async (ingress: Ingress): Promise<Ingress> => {
  const response = await axiosInstance.post<Ingress>("/ingress", {
    ...ingress,
  });
  return response.data;
};

export const useMutateCreateIngress = () => {
  const mutationOptions: UseMutationOptions<Ingress, Error, Ingress> = {
    mutationFn: createIngress,
  };

  const mutation = useMutation<Ingress, Error, Ingress>(mutationOptions);

  return mutation;
};
