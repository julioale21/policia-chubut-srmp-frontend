"use client";

import { useCustomSnackbar } from "@/app/common/hooks/useCustomSnackbar";
import { useNavigate } from "@/app/common/hooks/useNavigate";
import { Button, Paper, Stack, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutateCreateProvider } from "../hooks/useMutateCreateProvider";

interface IFormInput {
  name: string;
  city: string;
  contact_name: string;
  phone_number: string;
  address: string;
  website: string;
  email: string;
  notes: string;
}

export const ProviderForm = () => {
  const { mutate: createProvider } = useMutateCreateProvider();
  const { showError, showSuccess } = useCustomSnackbar();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      email: "",
      city: "",
      contact_name: "",
      phone_number: "",
      address: "",
      website: "",
    },
  });

  const onSubmit = (data: IFormInput) => {
    createProvider(data, {
      onSuccess: () => {
        showSuccess("Proveedor creado correctamente");
        queryClient.invalidateQueries({
          queryKey: ["providers"],
        });
        navigate("/provider");
      },
      onError: () => {
        showError("Error al crear el proveedor");
      },
    });
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
        <Stack gap={2} direction="row">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre del proveedor"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ciudad"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Stack>

        <Stack gap={2} direction="row" mt={2}>
          <Controller
            name="contact_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nomber de contacto"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="phone_number"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Teléfono de contacto"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Stack>

        <Stack mt={2}>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Dirección"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Stack>

        <Stack gap={2} direction="row" mt={2}>
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Sitio Web"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Stack>

        <Stack direction="row" justifyContent="center" mt={4}>
          <Button type="submit" size="medium" variant="text">
            Crear proveedor
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
