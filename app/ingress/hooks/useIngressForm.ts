import { useQueryClient } from "@tanstack/react-query";
import { useEquipements } from "./useEquipements";
import { useMoviles } from "./useMoviles";
import { useMutateCreateIngress } from "./useMutateCreateIngress";
import { useNavigate } from "@/app/common/hooks/useNavigate";
import { IFormInput, Ingress } from "../types";
import { useForm } from "react-hook-form";

export const useIngressForm = () => {
  const { data: moviles } = useMoviles();
  const { data: equipements } = useEquipements();
  const { mutate: createIngress } = useMutateCreateIngress();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();

  const onFormSubmit = (data: IFormInput) => {
    const internal_register = data.movil_ri.split(" - ")[0].trim();
    const movile = moviles?.find(
      (movil) => movil.internal_register === internal_register
    );

    const payload: Ingress = {
      date: data.date == "" ? null : data.date,
      order_number: data.order_number,
      movile_id: movile?.id,
      kilometers: parseInt(data.movil_kilometers.toString()),
      fuel_level: parseInt(data.movil_fuel_level.toString()),
      repair_description: data.description,
      equipements: data.equipements,
    };

    createIngress(payload, {
      onError: (error) => {
        console.error(error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["ingressOrders"] });
        navigate("/dashboard");
      },
    });
  };

  const selectedEquipements = watch("equipements", []);

  return {
    register,
    handleSubmit,
    onFormSubmit,
    setValue,
    selectedEquipements,
    errors,
    moviles,
    equipements,
  }
};
