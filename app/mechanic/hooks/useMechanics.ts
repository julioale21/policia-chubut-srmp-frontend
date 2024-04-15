import { useQuery } from "@tanstack/react-query";
import { Mechanic } from "../types";
import { mechanicService } from "..";

export const useMechanics = () => {
  const { data, isLoading, error, isError } = useQuery<Mechanic[], Error>({
    queryKey: ["mechanics"],
    queryFn: mechanicService.fetchMechanics,
  });

  return { data, isLoading, error, isError };
};
