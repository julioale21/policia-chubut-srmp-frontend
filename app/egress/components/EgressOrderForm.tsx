"use client";

import React from "react";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { CustomTitle } from "@/app/common/components/CustomTitle";

const EgressOrderForm = () => {
  return (
    <Paper sx={{ width: ["80%", "100%"], maxWidth: 700, padding: [2, 5] }}>
      <Stack>
        <CustomTitle text={"Crear orden de egreso"} />
        <Stack direction={["column", "row"]} gap={2} mt={4} width="100%">
          <TextField
            id="ingress-order"
            label="Número de orden ingreso"
            type="text"
            value="4321412"
            disabled
          />
          <TextField
            fullWidth
            id="egress-order"
            label="Número de orden egreso"
            type="text"
            value="4321412"
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
            // {...register("description", {
            //   required: "Debe especificar un motivo de ingreso",
            // })}
            // error={!!errors.description}
            // helperText={errors.description?.message}
          />
        </Stack>
        <Stack direction="row" mt={2} gap={2} justifyContent="flex-start">
          <Autocomplete
            disablePortal
            id="cbx-spare-part"
            options={[
              "filtro de aire",
              "filtro de aceite",
              "filtro de gasolina",
            ]}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Seleccione repuestos asignados" />
            )}
          />
          <Button>Agregar</Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default EgressOrderForm;
