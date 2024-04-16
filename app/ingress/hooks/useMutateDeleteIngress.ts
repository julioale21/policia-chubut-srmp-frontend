import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { ingressActions } from "..";

export const useMutateDeleteIngress = () => {
  const queryClient = useQueryClient();

  const mutationOptions: UseMutationOptions<String, Error, String> = {
    mutationFn: ingressActions.deletengress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ingressOrders"],
      });
    },
  };

  const mutation = useMutation<String, Error, String>(mutationOptions);

  return mutation;
};
