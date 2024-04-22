import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { sparePartService } from "..";
import { AxiosError } from "axios";

export const useMutateCreateSparepart = () => {
  const mutationOptions: UseMutationOptions<SparePart, AxiosError, SparePart> =
    {
      mutationFn: sparePartService.createSparePart,
    };

  const mutation = useMutation<SparePart, AxiosError, SparePart>(
    mutationOptions
  );

  return mutation;
};
