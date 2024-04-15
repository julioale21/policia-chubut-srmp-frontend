import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { Ingress } from "../types";
import { ingressActions } from "..";

export const useMutateCreateIngress = () => {
  const mutationOptions: UseMutationOptions<Ingress, Error, Ingress> = {
    mutationFn: ingressActions.createIngress,
  };

  const mutation = useMutation<Ingress, Error, Ingress>(mutationOptions);

  return mutation;
};
