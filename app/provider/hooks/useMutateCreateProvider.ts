import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { Provider } from "../types";
import { providersService } from "..";

export const useMutateCreateProvider = () => {
  const mutationOptions: UseMutationOptions<Provider, Error, Provider> = {
    mutationFn: providersService.createProvider,
  };

  const mutation = useMutation<Provider, Error, Provider>(mutationOptions);

  return mutation;
};
