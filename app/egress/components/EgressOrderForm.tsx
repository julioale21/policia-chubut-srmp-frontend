"use client";

import React from "react";
import {
  Autocomplete,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CustomTitle } from "@/app/common/components/CustomTitle";
import { Ingress } from "@/app/ingress/types";
import { Controller, useForm } from "react-hook-form";
import { useMechanics } from "@/app/mechanic/hooks/useMechanics";
import { Mechanic } from "@/app/mechanic/types";
import dayjs from "dayjs";
import { useMoviles } from "@/app/movil/hooks/useMoviles";
import { useSpareParts } from "@/app/spare_part/hooks/useSparePart";

interface EgressOrderFormProps {
  ingress?: Ingress;
}

interface IForm {
  sparePart: SparePart | null;
  mechanic: Mechanic | null;
  mechanic_boss: Mechanic | null;
  date: string | null;
  movil_ri: string | null;
}

const EgressOrderForm: React.FC<EgressOrderFormProps> = ({ ingress }) => {
  const { data: mechanics } = useMechanics();
  const { data: moviles } = useMoviles();
  const { data: sparePartsList } = useSpareParts();

  const [spareParts, setSpareParts] = React.useState<SparePart[]>([]);

  const {
    control,
    getValues,
    resetField,
    register,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      sparePart: null,
      mechanic: null,
      mechanic_boss: null,
      movil_ri: "",
      date:
        dayjs(ingress?.date).format("YYYY-MM-DD") ||
        dayjs().format("YYYY-MM-DD"),
    },
  });

  const handleAddSparePart = () => {
    const sparePart = getValues("sparePart");
    if (sparePart && !spareParts.some((part) => part.id === sparePart.id)) {
      setSpareParts([...spareParts, sparePart]);
      resetField("sparePart");
    }
  };

  function handleRemoveitem(sparePart: SparePart): void {
    setSpareParts(spareParts.filter((part) => part.id !== sparePart.id));
  }

  return (
    <Paper sx={{ width: ["80%", "100%"], maxWidth: 700, padding: [2, 5] }}>
      <Stack>
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
          <TextField
            fullWidth
            id="egress-order"
            label="Número de orden egreso"
            type="text"
            value="4321412"
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
            name="movil_ri"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disablePortal
                id="movil"
                options={moviles || []}
                getOptionLabel={(option) =>
                  `${option.internal_register} - ${option.model} ${option.domain}`
                }
                value={moviles?.find(
                  (movil) =>
                    `${movil.internal_register} - ${movil.model} ${movil.domain}` ===
                    value
                )}
                onChange={(event, newValue) => {
                  onChange(
                    newValue
                      ? `${newValue.internal_register} - ${newValue.model} ${newValue.domain}`
                      : ""
                  );
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione el Móvil"
                    error={!!errors.movil_ri}
                    helperText={errors.movil_ri?.message}
                  />
                )}
              />
            )}
          />
        </Stack>

        <Stack mt={2}>
          <Controller
            name="mechanic"
            control={control}
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
                  />
                )}
                value={field.value}
              />
            )}
          />
        </Stack>

        <Stack direction="row" gap={2} mt={2} width="100%">
          <TextField
            fullWidth
            id="description"
            label="Descripción de la reparación ..."
            multiline
            rows={4}
            type="text"
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
          {spareParts.map((sparePart) => (
            <Stack key={sparePart.id} border="1px solid green" padding={2}>
              <Typography>Marca: {sparePart.brand}</Typography>
              <Typography>Modelo: {sparePart.model}</Typography>
              <Typography>Descripción: {sparePart.description}</Typography>
              <Stack>
                <Button onClick={() => handleRemoveitem(sparePart)}>
                  Quitar
                </Button>
              </Stack>
            </Stack>
          ))}
        </Stack>

        <Stack mt={6} width="100%" direction="row" justifyContent="flex-end">
          <Button>Crear orden</Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default EgressOrderForm;
