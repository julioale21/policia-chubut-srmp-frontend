import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { CreateEgressDto, EgressOrder } from "../types";
import { egressActions } from "..";

export const useMutateCreateEgress = () => {
  const mutationOptions: UseMutationOptions<EgressOrder, Error, CreateEgressDto> = {
    mutationFn: egressActions.createEgress,
  };

  const mutation = useMutation<EgressOrder, Error, CreateEgressDto>(
    mutationOptions
  );

  return mutation;
};
