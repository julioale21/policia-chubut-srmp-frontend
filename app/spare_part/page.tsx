"use client";

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";

import { Edit, Delete } from "@mui/icons-material"; // MUI icons
import { useSpareParts } from "./hooks/useSparePart";
import { useNavigate } from "../common/hooks/useNavigate";
import { useMutateDeleteSparepart } from "./hooks/useMutateDeleteSparePart";
import { useCustomSnackbar } from "../common/hooks/useCustomSnackbar";
import { useQueryClient } from "@tanstack/react-query";

const SparePartPage = () => {
  const { showSuccess, showError } = useCustomSnackbar();
  const navigate = useNavigate();
  const { data: sparePartsList } = useSpareParts();
  const queryClient = useQueryClient();
  const { mutate: deleteSparePart } = useMutateDeleteSparepart({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spare-parts"] });
      showSuccess("Repuesto eliminado correctamente");
    },
    onError: () => {
      showError("Error al eliminar el repuesto");
    },
  });

  const handleCreateSparePart = () => {
    navigate("/spare_part/create");
  };

  const handleDeleteSparePart = (id: string) => {
    if (id === "") return;
    deleteSparePart(id);
  };

  const handleEditSparePart = (id: string) => {
    if (id === "") return;
    navigate(`/spare_part/edit/${id}`);
  };

  return (
    <section style={{ backgroundColor: "#F0F8FF", padding: "20px" }}>
      <Box maxWidth="xl" mx="auto">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Repuestos
        </Typography>
        <Grid container spacing={3}>
          {sparePartsList?.map((part, index) => (
            <Grid item xs={12} key={index}>
              <Paper elevation={2} sx={{ padding: 2, borderRadius: 2 }}>
                <Grid container alignItems="center">
                  <Grid item xs={9}>
                    <Stack spacing={0.5}>
                      <Typography variant="h6" fontWeight="bold">
                        {part.brand} {part.model}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Código: {part.code}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {part.description}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                          Vehiculos compatibles:
                        </Typography>
                        {part.compatible_vehicles.map((vehicle) => (
                          <Chip key={vehicle} label={vehicle} size="small" />
                        ))}
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={3}>
                    <Stack alignItems="flex-end" spacing={1}>
                      <Chip
                        label={`${part.stock} en stock`}
                        color="primary"
                        sx={{ fontWeight: "bold" }}
                      />
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          onClick={() => handleEditSparePart(part?.id || "")}
                          size="small"
                          color="info"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteSparePart(part?.id || "")}
                          size="small"
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Button
          onClick={handleCreateSparePart}
          variant="contained"
          sx={{ mt: 2 }}
        >
          Crear nuevo repuesto
        </Button>
      </Box>
    </section>
  );
};

export default SparePartPage;
