import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { Ingress } from "../types";
import { ingressActions } from "..";

export const useMutateUpdateIngress = () => {
  const mutationOptions: UseMutationOptions<Ingress, Error, Ingress> = {
    mutationFn: ingressActions.updateIngress,
  };

  const mutation = useMutation<Ingress, Error, Ingress>(mutationOptions);

  return mutation;
};
