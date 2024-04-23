import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { SparePartOrder } from "../types";
import { sparePartOrderService } from "..";

export const useMutateCreateSparePartOrder = () => {
  const mutationOptions: UseMutationOptions<
    SparePartOrder,
    Error,
    SparePartOrder
  > = {
    mutationFn: sparePartOrderService.createSparePartOrder,
  };

  const mutation = useMutation<SparePartOrder, Error, SparePartOrder>(
    mutationOptions
  );

  return mutation;
};
