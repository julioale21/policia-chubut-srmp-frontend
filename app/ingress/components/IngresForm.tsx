"use client";
import React from "react";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useMoviles } from "../hooks/useMoviles";
import { Ingress } from "../types";
import { useMutateCreateIngress } from "../hooks/useMutateCreateIngress";
import { useEquipements } from "../hooks/useEquipements";
import { useNavigate } from "@/app/common/hooks/useNavigate";
import { useQueryClient } from "@tanstack/react-query";

interface IFormInput {
  date: string;
  order_number: string;
  movil_ri: string;
  movil_kilometers: number;
  movil_fuel_level: number;
  description: string;
  equipements: string[];
}

export const IngresForm: React.FC = () => {
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

    console.log({ payload });

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

  const handleCheckboxChange = (id: string) => {
    const currentIndex = selectedEquipements.indexOf(id);
    const newChecked = [...selectedEquipements];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setValue("equipements", newChecked);
  };

  return (
    <Paper sx={{ width: ["80%", "100%"], maxWidth: 700, padding: [2, 5] }}>
      <Stack
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
        direction="column"
        width="100%"
      >
        <Typography
          textAlign="center"
          color="primary"
          component="h3"
          fontWeight="bold"
          mx="auto"
          fontSize={[24, 48]}
        >
          Formulario creación ordenes de ingreso
        </Typography>
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
        <Stack direction="column" gap={2} mt={2} width="100%">
          <Typography>Equipamiento</Typography>
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {equipements?.map((equipement) => (
              <FormControlLabel
                key={equipement.id}
                control={
                  <Checkbox
                    checked={selectedEquipements.includes(equipement.id)}
                    onChange={() => handleCheckboxChange(equipement.id)}
                  />
                }
                label={equipement.type}
              />
            ))}
          </FormGroup>
        </Stack>
        <Stack mt={4} direction="row" width="100%" justifyContent="flex-end">
          <Button type="submit">Crear orden</Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
function setValue(arg0: string, newChecked: any[]) {
  throw new Error("Function not implemented.");
}
