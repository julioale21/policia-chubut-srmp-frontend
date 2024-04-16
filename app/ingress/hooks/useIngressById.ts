import { useQuery } from "@tanstack/react-query";
import { ingressActions } from "..";

export const useIngressById = (id: string) => {
  const query = useQuery({
    queryKey: ["ingressById", id],
    queryFn: () => ingressActions.getIngressById(id),
    enabled: !!id,
    // staleTime: 60 * 60 * 1000,
  });

  return query;
};
