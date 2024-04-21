"use client";

import React from "react";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";

const SparePartForm = () => {
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
      <Stack gap={2}>
        <Stack direction={["column", "row"]} gap={2}>
          <TextField fullWidth id="brand" label="Marca *" type="text" />
          <TextField fullWidth id="marca" label="Modelo *" type="text" />
        </Stack>
        <TextField
          multiline
          rows={4}
          fullWidth
          id="description"
          label="Descripción"
          type="text"
        />
      </Stack>
      <Stack mt={2} width="100%" direction="row" justifyContent="flex-end">
        <TextField
          sx={{ width: 150 }}
          id="quantity"
          label="cantidad *"
          type="number"
          InputProps={{ inputProps: { min: 1, defaultValue: 1 } }}
        />
      </Stack>
      <Stack direction="row" justifyContent="flex-end" mt={2}>
        <Typography variant="caption">* Campos obligatorios</Typography>
      </Stack>

      <Stack direction="row" justifyContent="center" mt={2}>
        <Button size="large">Ingresar</Button>
      </Stack>
    </Paper>
  );
};

export { SparePartForm };
