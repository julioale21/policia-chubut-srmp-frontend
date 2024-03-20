import axiosInstance from "@/app/config/axios";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

const deletengress = async (id: String): Promise<String> => {
  try {
    await axiosInstance.delete(`/ingress/${id}`);
    return "Ingress deleted successfully";
  } catch (error) {
    return "Error deleting ingress";
  }
};

export const useMutateDeleteIngress = () => {
  const queryClient = useQueryClient();

  const mutationOptions: UseMutationOptions<String, Error, String> = {
    mutationFn: deletengress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ingressOrders"],
      });
    },
  };

  const mutation = useMutation<String, Error, String>(mutationOptions);

  return mutation;
};
