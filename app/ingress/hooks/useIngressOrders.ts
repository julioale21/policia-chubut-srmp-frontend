import { useQuery } from "@tanstack/react-query";
import { ingressActions } from "..";

export const useIngressOrders = (
  page?: number,
  limit?: number,
  searchTerm?: string
) => {
  const query = useQuery({
    queryKey: ["ingressOrders", page, limit, searchTerm],
    queryFn: () => ingressActions.getIngressOrders(page, limit, searchTerm),
  });

  return query;
};
