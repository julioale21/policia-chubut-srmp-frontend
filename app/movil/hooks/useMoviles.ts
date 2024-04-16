import { Movile } from "../../ingress/types";
import { useQuery } from "@tanstack/react-query";
import { movilActions } from "..";

export const useMoviles = () => {
  const { data, isLoading, error, isError } = useQuery<Movile[], Error>({
    queryKey: ["moviles"],
    queryFn: movilActions.getMoviles,
  });

  return { data, isLoading, error, isError };
};
