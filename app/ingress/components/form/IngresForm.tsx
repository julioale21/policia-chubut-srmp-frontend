"use client";
import React from "react";
import { Autocomplete, Button, Paper, Stack, TextField } from "@mui/material";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useIngressForm } from "../../hooks/useIngressForm";
import { EquipementList } from "./EquipementList";
import { IngressFormTitle } from "./IngressFormTitle";

export const IngresForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    onFormSubmit,
    setValue,
    selectedEquipements,
    errors,
    moviles,
    equipements,
  } = useIngressForm();

  return (
    <Paper sx={{ width: ["80%", "100%"], maxWidth: 700, padding: [2, 5] }}>
      <Stack
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
        direction="column"
        width="100%"
      >
        <IngressFormTitle text="Formulario creación ordenes de ingreso" />

        <Stack direction={["column", "row"]} gap={2} mt={4} width="100%">
          <TextField
            fullWidth
            id="order"
            label="Número de orden"
            type="text"
            {...register("order_number", {
              required: "Número de orden requerido",
            })}
            error={!!errors.order_number}
            helperText={errors.order_number?.message}
          />
          <TextField
            fullWidth
            id="date"
            label="Fecha"
            type="date"
            {...register("date")}
            error={!!errors.date}
            helperText={errors.date?.message}
          />
        </Stack>
        <Stack direction={["column", "row"]} gap={2} mt={2} width="100%">
          <Autocomplete
            disablePortal
            id="movile"
            options={moviles || []}
            getOptionLabel={(option) =>
              `${option.internal_register} - ${option.model} ${option.domain}`
            }
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="Seleccione el Móvil"
                {...register("movil_ri", {
                  required: "Debe ingresar el registro interno del movil",
                })}
                error={!!errors.movil_ri}
                helperText={errors.movil_ri?.message}
              />
            )}
          />

          <TextField
            id="kilometers"
            label="Kilometros"
            type="number"
            sx={{ width: ["100%", "40%"] }}
            {...register("movil_kilometers", {
              required: "Debe ingresar los kilometros del movil",
            })}
            error={!!errors.movil_kilometers}
            helperText={errors.movil_kilometers?.message}
          />
          <TextField
            id="fuel_level"
            label="Nivel de combustible"
            type="number"
            sx={{ width: ["100%", "40%"] }}
            {...register("movil_fuel_level", {
              required: "Debe ingresar el nivel de combustible del movil",
            })}
            error={!!errors.movil_fuel_level}
            helperText={errors.movil_fuel_level?.message}
          />
        </Stack>
        <Stack direction="row" gap={2} mt={2} width="100%">
          <TextField
            fullWidth
            id="description"
            label="Descripción"
            multiline
            rows={4}
            type="text"
            {...register("description", {
              required: "Debe especificar un motivo de ingreso",
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Stack>

        <EquipementList
          equipements={equipements}
          selectedEquipements={selectedEquipements}
          setValue={setValue}
        />

        <Stack mt={4} direction="row" width="100%" justifyContent="flex-end">
          <Button
            variant="outlined"
            endIcon={<AddOutlinedIcon />}
            type="submit"
          >
            Crear orden
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
