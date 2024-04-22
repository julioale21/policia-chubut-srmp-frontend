"use client";

import React from "react";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useMutateCreateSparepart } from "../hooks/useMutateCreateSparePart";
import { Controller, useForm } from "react-hook-form";
import { useCustomSnackbar } from "@/app/common/hooks/useCustomSnackbar";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@/app/common/hooks/useNavigate";

interface IFormInput {
  code: string;
  brand: string;
  model: string;
  description: string;
  compatible_vehicles: string[];
  vehicle_input: string;
}

const SparePartForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createSparePart } = useMutateCreateSparepart();
  const { showSuccess, showError } = useCustomSnackbar();
  const [vehicles, setVehicles] = React.useState<string[]>([]);

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      brand: "",
      model: "",
      description: "",
      code: "",
      compatible_vehicles: [],
      vehicle_input: "",
    },
  });

  const onSubmit = async (data: IFormInput) => {
    const { vehicle_input, ...rest } = data;
    const spare_part: SparePart = {
      ...rest,
      compatible_vehicles: vehicles,
    };

    createSparePart(spare_part, {
      onSuccess: () => {
        showSuccess("Repuesto ingresado correctamente");
        queryClient.invalidateQueries({
          queryKey: ["spare-parts"],
        });
        navigate("/dashboard");
      },
      onError: (error) => {
        console.log(error);
        showError("El repuesto ya existe");
      },
    });
  };

  const handleAddCompatibleVehicle = () => {
    const vehicle = getValues("vehicle_input");
    if (vehicle && !vehicles.includes(vehicle)) {
      setVehicles([...vehicles, vehicle]);
      setValue("vehicle_input", "");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        paddingTop: 5,
        minWidth: [370, 600, 1000],
        marginTop: 3,
      }}
    >
      <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <Stack gap={2} direction="row">
            <Controller
              name="code"
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <TextField
                  id="code"
                  label="Código *"
                  type="text"
                  sx={{ width: "50%" }}
                  error={!!errors.code}
                  helperText={errors.code?.message}
                  {...field}
                />
              )}
            />
            <Stack width="50%"></Stack>
          </Stack>
          <Stack direction={["column", "row"]} gap={2}>
            <Controller
              name="brand"
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id="brand"
                  label="Marca *"
                  type="text"
                  error={!!errors.brand}
                  helperText={errors.brand?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="model"
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id="model"
                  label="Modelo *"
                  type="text"
                  error={!!errors.model}
                  helperText={errors.model?.message}
                  {...field}
                />
              )}
            />
          </Stack>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                multiline
                rows={4}
                fullWidth
                id="description"
                label="Descripción"
                type="text"
                {...field}
              />
            )}
          />
        </Stack>

        <Stack mt={2}>
          <Typography>
            Si conoce los vehiculos compatibles con este repuesto ingreselos
            aqui
          </Typography>
          <Stack direction="row" gap={2} mt={2}>
            <Controller
              name="vehicle_input"
              control={control}
              render={({ field }) => (
                <TextField
                  id="vehicle"
                  label="Vehiculos compatibles"
                  type="text"
                  sx={{ width: "50%" }}
                  {...field}
                />
              )}
            />
            <Button
              onClick={handleAddCompatibleVehicle}
              size="small"
              variant="text"
            >
              Agregar
            </Button>
          </Stack>

          <Stack mt={2}>
            {vehicles.map((vehicle, index) => (
              <Stack
                key={index}
                direction="row"
                gap={1}
                mt={1}
                alignItems="center"
              >
                <LibraryAddCheckIcon sx={{ color: "gray" }} />
                <Typography key={index}>{vehicle}</Typography>
                <Button
                  onClick={() =>
                    setVehicles(vehicles.filter((v) => v !== vehicle))
                  }
                  size="small"
                  variant="text"
                >
                  Quitar
                </Button>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" mt={2}>
          <Typography variant="caption">* Campos obligatorios</Typography>
        </Stack>

        <Stack direction="row" justifyContent="center" mt={2}>
          <Button type="submit" size="large">
            Ingresar
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export { SparePartForm };
