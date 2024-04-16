import { useQuery } from "@tanstack/react-query";
import { sparePartService } from "..";

export const useSpareParts = () => {
  const query = useQuery({
    queryKey: ["spare-parts"],
    queryFn: () => sparePartService.getSpareParts(),
  });

  return query;
};
