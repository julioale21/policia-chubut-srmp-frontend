import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { sparePartService } from "..";
import { AxiosError } from "axios";

export const useMutateDeleteSparepart = (
  options?: UseMutationOptions<string, AxiosError, string>
) => {
  const mutationOptions: UseMutationOptions<string, AxiosError, string> = {
    mutationKey: ["deleteSparePart"],
    mutationFn: async (sparePartId) => {
      try {
        const response = await sparePartService.deleteSparePart(sparePartId);
        return response;
      } catch (error) {
        throw error;
      }
    },
    ...options,
  };

  return useMutation(mutationOptions);
};
