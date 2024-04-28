import { useQuery } from "@tanstack/react-query";
import { Provider } from "../types";
import { providersService } from "..";

export const useProviders = () => {
  const query = useQuery<Provider[], Error>({
    queryKey: ["providers"],
    queryFn: providersService.getProviders,
  });

  return query;
};
