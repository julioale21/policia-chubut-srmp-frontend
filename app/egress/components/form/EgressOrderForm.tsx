"use client";

import React from "react";
import { Autocomplete, Button, Paper, Stack, TextField } from "@mui/material";
import { CustomTitle } from "@/app/common/components/CustomTitle";
import { Ingress } from "@/app/ingress/types";
import { Controller, useForm } from "react-hook-form";
import { useMechanics } from "@/app/mechanic/hooks/useMechanics";
import { Mechanic } from "@/app/mechanic/types";
import dayjs from "dayjs";
import { useMoviles } from "@/app/movil/hooks/useMoviles";
import { useSpareParts } from "@/app/spare_part/hooks/useSparePart";
import { CreateEgressDto } from "../../types";
import { useMutateCreateEgress } from "../../hooks/useMutateCreateEgressOrder";
import { Movil } from "@/app/common/interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@/app/common/hooks/useNavigate";
import { useCustomSnackbar } from "@/app/common/hooks/useCustomSnackbar";
import { Item, OrderItem } from "./OrderItem";

interface EgressOrderFormProps {
  ingress?: Ingress;
}

interface IForm {
  sparePart: SparePart | null;
  mechanic: Mechanic | null;
  mechanic_boss: Mechanic | null;
  date: string | null;
  movil: Movil | null;
  egress_order: string;
  observations: string;
}

export const EgressOrderForm: React.FC<EgressOrderFormProps> = ({
  ingress,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showSuccess, showError } = useCustomSnackbar();
  const { data: mechanics } = useMechanics();
  const { data: moviles } = useMoviles();
  const { data: sparePartsList } = useSpareParts();
  const { mutate: createEgressOrder } = useMutateCreateEgress();

  const [sparePartsArray, setSparePartsArray] = React.useState<Item[]>([]);

  const {
    control,
    getValues,
    resetField,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IForm>({
    defaultValues: {
      sparePart: null,
      mechanic: null,
      mechanic_boss: null,
      egress_order: "",
      observations: "",
      movil: null,
      date:
        dayjs(ingress?.date).format("YYYY-MM-DD") ||
        dayjs().format("YYYY-MM-DD"),
    },
  });

  const onSubmit = (data: IForm) => {
    if (!data.movil) {
      return;
    }

    const egressOrder: CreateEgressDto = {
      date: new Date(data.date || ""),
      observations: data.observations,
      order_number: data.egress_order,
      mechanic_boss_id: data.mechanic_boss?.id || "",
      mechanic_id: data.mechanic?.id || "",
      movil_id: data.movil?.id,
      ingress_id: ingress?.id || "",
      spare_parts: sparePartsArray.map((part) => ({
        id: part.sparePart.id,
        quantity: part.quantity,
      })),
    };

    console.log(egressOrder);

    // createEgressOrder(egressOrder, {
    //   onSuccess: () => {
    //     queryClient.invalidateQueries({
    //       queryKey: ["egressOrders", 0, 10, ""],
    //     });

    //     showSuccess("Orden de egreso creada correctamente");
    //     navigate("/egress");
    //   },
    //   onError: (err) => {
    //     showError("Error al crear la orden de egreso, Verifique los datos.");
    //   },
    // });
  };

  const handleAddSparePart = () => {
    const sparePart = getValues("sparePart");
    if (
      sparePart &&
      !sparePartsArray.some((item) => item.sparePart.id === sparePart.id)
    ) {
      setSparePartsArray([...sparePartsArray, { sparePart, quantity: 1 }]);
      resetField("sparePart");
    } else {
      const index = sparePartsArray.findIndex(
        (item) => item.sparePart.id === sparePart?.id
      );
      if (index !== -1) {
        const newSparePartsArray = [...sparePartsArray];
        newSparePartsArray[index].quantity += 1;
        setSparePartsArray(newSparePartsArray);
      }
    }
  };

  function handleRemoveitem(item: Item): void {
    setSparePartsArray(
      sparePartsArray.filter((item) => item.sparePart.id !== item.sparePart.id)
    );
  }

  const handleIncrementItem = (item: Item) => {
    const index = sparePartsArray.findIndex(
      (sparePart) => sparePart.sparePart.id === item.sparePart.id
    );

    if (index !== -1) {
      const newSparePartsArray = [...sparePartsArray];
      newSparePartsArray[index].quantity += 1;
      setSparePartsArray(newSparePartsArray);
    }
  };

  const handleDecrementItem = (item: Item) => {
    const index = sparePartsArray.findIndex(
      (sparePart) => sparePart.sparePart.id === item.sparePart.id
    );

    if (index !== -1) {
      const newSparePartsArray = [...sparePartsArray];
      newSparePartsArray[index].quantity -= 1;

      if (newSparePartsArray[index].quantity === 0) {
        setSparePartsArray(
          sparePartsArray.filter(
            (sparePart) => sparePart.sparePart.id !== item.sparePart.id
          )
        );
      } else {
        setSparePartsArray(newSparePartsArray);
      }
    }
  };

  return (
    <Paper sx={{ width: ["80%", "100%"], maxWidth: 700, padding: [2, 5] }}>
      <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
        <CustomTitle text={"Crear orden de egreso"} />

        <Stack direction={["column", "row"]} gap={3} mt={4} width="100%">
          <TextField
            fullWidth
            id="ingress-order"
            label="Número de orden ingreso"
            type="text"
            value={ingress?.order_number}
            disabled
          />

          <TextField
            fullWidth
            id="ingress_date"
            label="Fecha ingreso"
            type="date"
            value={dayjs(ingress?.date).format("YYYY-MM-DD")}
            disabled
          />
        </Stack>

        <Stack mt={2} direction="row" gap={3}>
          <Controller
            control={control}
            name="egress_order"
            rules={{
              required: "El número de orden de egreso es requerido",
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                id="egress_order"
                label="Número de orden egreso"
                type="text"
                {...field}
                error={!!errors.egress_order}
                helperText={errors.egress_order?.message}
              />
            )}
          />

          <TextField
            fullWidth
            id="date"
            label="Fecha egreso"
            type="date"
            {...register("date")}
            error={!!errors.date}
            helperText={errors.date?.message}
          />
        </Stack>

        <Stack mt={2}>
          <Controller
            name="movil"
            control={control}
            rules={{
              required: "El móvil es requerido",
            }}
            render={({ field }) => (
              <Autocomplete
                fullWidth
                disablePortal
                id="movil"
                options={moviles || []}
                getOptionLabel={(option) =>
                  `${option.internal_register} - ${option.model} ${option.domain}`
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newValue) => {
                  field.onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    error={!!errors.movil}
                    helperText={errors ? errors.movil?.message : null}
                    {...params}
                    label="Seleccione el Móvil"
                  />
                )}
                value={field.value}
              />
            )}
          />
        </Stack>

        <Stack mt={2}>
          <Controller
            name="mechanic"
            control={control}
            rules={{
              required: "El mecánico es requerido",
            }}
            render={({ field }) => (
              <Autocomplete
                fullWidth
                disablePortal
                id="mechanic"
                options={mechanics || []}
                getOptionLabel={(option) =>
                  `${option.name} ${option.surname}` || ""
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newValue) => {
                  field.onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Meánico asignado a la reparación"
                    error={!!errors.mechanic}
                    helperText={errors ? errors.mechanic?.message : null}
                  />
                )}
                value={field.value}
              />
            )}
          />
        </Stack>

        <Stack mt={2}>
          <Controller
            name="mechanic_boss"
            control={control}
            rules={{
              required: "El jefe de mecánicos es requerido",
            }}
            render={({ field }) => (
              <Autocomplete
                fullWidth
                disablePortal
                id="mechanic_boss"
                options={mechanics || []}
                getOptionLabel={(option) =>
                  `${option.name} ${option.surname}` || ""
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newValue) => {
                  field.onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Jéfe de mecánicos asignado a la reparación"
                    error={!!errors.mechanic_boss}
                    helperText={errors ? errors.mechanic_boss?.message : null}
                  />
                )}
                value={field.value}
              />
            )}
          />
        </Stack>

        <Stack direction="row" gap={2} mt={2} width="100%">
          <Controller
            control={control}
            name="observations"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="observations"
                label="Descripción de la reparación ..."
                multiline
                rows={4}
                type="text"
                value={field.value}
                error={!!errors.observations}
                helperText={errors.observations?.message}
              />
            )}
          />
        </Stack>

        <Stack direction="row" mt={2} gap={2} justifyContent="flex-start">
          <Controller
            name="sparePart"
            control={control}
            render={({ field }) => (
              <Autocomplete
                fullWidth
                disablePortal
                id="cbx-spare-part"
                options={sparePartsList || []}
                getOptionLabel={(option) =>
                  `${option.brand}: ${option.model} - ${option.description}` ||
                  ""
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newValue) => {
                  field.onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione repuestos asignados"
                  />
                )}
                value={field.value}
              />
            )}
          />
          <Button sx={{ py: 1 }} size="large" onClick={handleAddSparePart}>
            Agregar
          </Button>
          <Button sx={{ alignSelf: "right", ml: 5 }}>Solicitar repuesto</Button>
        </Stack>

        <Stack width="100%" mt={3} gap={2}>
          {sparePartsArray.map((item) => (
            <OrderItem
              key={item.sparePart.id}
              item={item}
              onRemove={() => handleRemoveitem(item)}
              onDecrement={() => handleDecrementItem(item)}
              onIncrement={() => handleIncrementItem(item)}
            />
          ))}
        </Stack>

        <Stack mt={6} width="100%" direction="row" justifyContent="flex-end">
          <Button type="submit">Crear orden</Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
