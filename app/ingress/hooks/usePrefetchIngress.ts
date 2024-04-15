import { useQueryClient } from "@tanstack/react-query";
import { ingressActions } from "..";

export const usePrefetchIngress = () => {
  const queryClient = useQueryClient();

  const prefetchIngress = async (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ["ingressById", id],
      queryFn: () => ingressActions.getIngressById(id),
      staleTime: 60 * 60 * 1000,
    });
  };

  return prefetchIngress;
};
