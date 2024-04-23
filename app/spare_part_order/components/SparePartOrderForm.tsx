"use client";

import React from "react";
import { Autocomplete, Button, Paper, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useSpareParts } from "@/app/spare_part/hooks/useSparePart";
import { OrderItem } from "@/app/common/components";
import dayjs from "dayjs";
import { useProviders } from "@/app/provider/hooks/useProviders";
import { Provider } from "@/app/provider/types";
import { Item, SparePartOrder } from "../types";
import { useMutateCreateSparePartOrder } from "../hooks/useMutateCreateSparePartOrder";
import { useCustomSnackbar } from "@/app/common/hooks/useCustomSnackbar";
import { useNavigate } from "@/app/common/hooks/useNavigate";

interface IFormInput {
  order_number: string;
  order_item?: SparePart | null;
  quantity: number;
  order_date: string | null;
  description: string;
  provider: Provider | null;
}

const SparePartOrderForm = () => {
  const [itemsArray, setItemsArray] = React.useState<Item[]>([]);
  const { data: spareParts } = useSpareParts();
  const { data: providers } = useProviders();
  const { mutate: createSparePartOrder } = useMutateCreateSparePartOrder();
  const { showSuccess, showError } = useCustomSnackbar();
  const navigate = useNavigate();

  const {
    control,
    getValues,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      order_number: "",
      order_item: null,
      quantity: 1,
      provider: null,
      order_date: dayjs().format("YYYY-MM-DD"),
      description: "",
    },
  });

  const onSubmit = (data: IFormInput) => {
    const payload: SparePartOrder = {
      order_number: data.order_number,
      type: "in",
      date: dayjs(data.order_date).toDate(),
      observations: data.description,
      provider_id: data.provider?.id,
      spare_part_items: itemsArray.map((item) => ({
        spare_part_id: item.sparePart.id,
        quantity: item.quantity,
      })),
    };

    createSparePartOrder(payload, {
      onSuccess: () => {
        showSuccess("Orden de repuesto creada correctamente");
        setItemsArray([]);
        navigate("/dashboard");
      },
      onError: (error) => {
        showError("Error al crear la orden de repuesto");
        console.error(error);
      },
    });
  };

  const handleAddItem = () => {
    const sparePart = getValues("order_item");
    if (
      sparePart &&
      !itemsArray.some((item) => item.sparePart.id === sparePart.id)
    ) {
      setItemsArray([...itemsArray, { sparePart, quantity: 1 }]);
      resetField("order_item");
    } else {
      const index = itemsArray.findIndex(
        (item) => item.sparePart.id === sparePart?.id
      );
      if (index !== -1) {
        const newSparePartsArray = [...itemsArray];
        newSparePartsArray[index].quantity += 1;
        setItemsArray(newSparePartsArray);
      }
    }
  };

  function handleRemoveitem(item: Item): void {
    setItemsArray(
      itemsArray.filter((item) => item.sparePart.id !== item.sparePart.id)
    );
  }

  const handleIncrementItem = (item: Item) => {
    const index = itemsArray.findIndex(
      (sparePart) => sparePart.sparePart.id === item.sparePart.id
    );

    if (index !== -1) {
      const newSparePartsArray = [...itemsArray];
      newSparePartsArray[index].quantity += 1;
      setItemsArray(newSparePartsArray);
    }
  };

  const handleDecrementItem = (item: Item) => {
    const index = itemsArray.findIndex(
      (sparePart) => sparePart.sparePart.id === item.sparePart.id
    );

    if (index !== -1) {
      const newSparePartsArray = [...itemsArray];
      newSparePartsArray[index].quantity -= 1;

      if (newSparePartsArray[index].quantity === 0) {
        setItemsArray(
          itemsArray.filter(
            (sparePart) => sparePart.sparePart.id !== item.sparePart.id
          )
        );
      } else {
        setItemsArray(newSparePartsArray);
      }
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        paddingTop: 5,
        width: [370, 600, 900],
        marginTop: 3,
      }}
    >
      <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <Stack gap={2} direction="row">
            <Controller
              name="order_number"
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <TextField
                  id="code"
                  label="Código *"
                  type="text"
                  sx={{ width: "50%" }}
                  error={!!errors.order_number}
                  helperText={errors.order_number?.message}
                  {...field}
                />
              )}
            />
            <Stack width="50%">
              <Controller
                name="order_date"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="date"
                    label="Fecha"
                    type="date"
                    error={!!errors.order_date}
                    helperText={errors.order_date?.message}
                  />
                )}
              />
            </Stack>
          </Stack>
        </Stack>

        <Stack mt={2}>
          <Controller
            name="provider"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Autocomplete
                fullWidth
                disablePortal
                id="provider"
                options={providers || []}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newValue) => {
                  field.onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione el Proveedor"
                    error={!!errors.provider}
                    helperText={errors.provider?.message?.toString()}
                  />
                )}
                value={field.value}
              />
            )}
          />
        </Stack>

        <Stack direction="row" gap={2} mt={2} width="100%">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                minRows={4}
                id="description"
                label="Descripción"
                type="text"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </Stack>

        <Stack direction="row" mt={2} gap={2} justifyContent="flex-start">
          <Controller
            name="order_item"
            control={control}
            render={({ field }) => (
              <Autocomplete
                fullWidth
                disablePortal
                id="cbx-spare-part"
                options={spareParts || []}
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
          <Button sx={{ py: 1 }} size="large" onClick={handleAddItem}>
            Agregar
          </Button>
        </Stack>

        <Stack width="100%" mt={3} gap={2}>
          {itemsArray.map((item) => (
            <OrderItem
              key={item.sparePart.id}
              item={item}
              onRemove={() => handleRemoveitem(item)}
              onDecrement={() => handleDecrementItem(item)}
              onIncrement={() => handleIncrementItem(item)}
            />
          ))}
        </Stack>

        <Stack mt={2} direction="row" justifyContent="center">
          <Button size="medium" type="submit">
            Enviar formulario
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export { SparePartOrderForm };
