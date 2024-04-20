import { useQuery } from "@tanstack/react-query";
import { egressActions } from "..";

export const useEgressOrders = (
  page?: number,
  limit?: number,
  searchTerm?: string
) => {
  const query = useQuery({
    queryKey: ["egressOrders", page, limit, searchTerm],
    queryFn: () => egressActions.getEgressOrders(page, limit, searchTerm),
  });

  return query;
};
