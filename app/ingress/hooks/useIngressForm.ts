import { useQueryClient } from "@tanstack/react-query";
import { useEquipements } from "./useEquipements";
import { useMoviles } from "./useMoviles";
import { useMutateCreateIngress } from "./useMutateCreateIngress";
import { useNavigate } from "@/app/common/hooks/useNavigate";
import { IFormInput, Ingress, Movile } from "../types";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useMutateUpdateIngress } from "./useMutateUpdateIngress";

export const useIngressForm = (ingress?: Ingress) => {
  const { data: moviles } = useMoviles();
  const [selectedMovil, setSelectedMovil] = useState<Movile | null | undefined>(
    null
  );
  const { data: equipements } = useEquipements();
  const { mutate: createIngress } = useMutateCreateIngress();
  const { mutate: updateIngress } = useMutateUpdateIngress();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (moviles && ingress?.movile) {
      const foundMovil = moviles.find(
        (m) => m.internal_register === ingress?.movile?.internal_register
      );
      setSelectedMovil(foundMovil);
    }
  }, [moviles, ingress]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      order_number: ingress?.order_number || "",
      date:
        dayjs(ingress?.date).format("YYYY-MM-DD") ||
        dayjs().format("YYYY-MM-DD"),
      description: ingress?.repair_description || "",
      equipements: ingress?.equipementIngress
        ? ingress.equipementIngress.map((equip) => equip.equipement.id)
        : [],
      movil_fuel_level: ingress?.fuel_level || 0,
      movil_kilometers: ingress?.kilometers || 0,
      movil_ri: ingress?.movile
        ? `${ingress.movile.internal_register} - ${ingress.movile.model} ${ingress.movile.domain}`
        : "",
    },
  });

  useEffect(() => {
    if (equipements && ingress?.equipementIngress) {
      const selectedEquipementIds = ingress.equipementIngress
        .map((ingressEquip) => {
          const equip = equipements.find(
            (e) => e.id === ingressEquip.equipement.id
          );
          return equip ? equip.id : null;
        })
        .filter((id) => id !== null);

      setValue("equipements", selectedEquipementIds);
    }
  }, [equipements, ingress, setValue]);

  const onFormSubmit = (data: IFormInput) => {
    const internal_register = data.movil_ri.split(" - ")[0].trim();
    const movile = moviles?.find(
      (movil) => movil.internal_register === internal_register
    );

    const payload: Ingress = {
      date: data.date == "" ? null : dayjs(data.date).toDate(),
      order_number: data.order_number,
      movile_id: movile?.id,
      kilometers: parseInt(data.movil_kilometers.toString()),
      fuel_level: parseInt(data.movil_fuel_level.toString()),
      repair_description: data.description,
      equipements: data.equipements,
    };

    if (!ingress) {
      createIngress(payload, {
        onError: (error) => {
          console.error(error);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["ingressOrders"] });
          navigate("/dashboard");
        },
      });
    } else {
      payload.id = ingress.id;
      updateIngress(payload, {
        onError: (error) => {
          console.error(error);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["ingressOrders"],
          });
          navigate("/dashboard");
        },
      });
    }
  };

  const selectedEquipements = watch("equipements", []);

  return {
    register,
    handleSubmit,
    onFormSubmit,
    setValue,
    setSelectedMovil,
    selectedEquipements,
    selectedMovil,
    errors,
    moviles,
    equipements,
  };
};
