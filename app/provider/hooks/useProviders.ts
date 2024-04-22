import { useQuery } from "@tanstack/react-query";
import { Provider } from "../types";
import { providersService } from "..";

export const useProviders = () => {
  const { data, isLoading, error, isError } = useQuery<Provider[], Error>({
    queryKey: ["providers"],
    queryFn: providersService.getProviders,
  });

  return { data, isLoading, error, isError };
};
