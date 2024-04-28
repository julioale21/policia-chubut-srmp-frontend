import { useQuery } from "@tanstack/react-query";
import { statisticsService } from "..";
import { Statistics } from "../types";

export const useStatistics = () => {
  const { data, isLoading, error, isError } = useQuery<Statistics, Error>({
    queryKey: ["statistics"],
    queryFn: statisticsService.getStatistics,
  });

  return { data, isLoading, error, isError };
};
