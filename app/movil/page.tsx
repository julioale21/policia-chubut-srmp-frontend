"use client";

import React, { useState, useEffect } from "react";
import { Stack, TextField, Button, Typography } from "@mui/material";
import { useMoviles } from "./hooks/useMoviles";
import { MovilCard } from "./components/MovilCard";
import { Movil } from "./types";

const MovilesPage = () => {
  const { data: moviles } = useMoviles();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMoviles, setFilteredMoviles] = useState<Movil[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (moviles) {
      const filtered = moviles.filter(
        (movil) =>
          movil.internal_register
            .toLowerCase()
            .trim()
            .includes(searchTerm.toLowerCase()) ||
          movil.brand.toLowerCase().trim().includes(searchTerm.toLowerCase()) ||
          movil.model.toLowerCase().trim().includes(searchTerm.toLowerCase()) ||
          movil.domain.toLowerCase().trim().includes(searchTerm.toLowerCase())
      );
      setFilteredMoviles(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, moviles]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMoviles = filteredMoviles.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Stack
      width="100%"
      // minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Stack
        my={2}
        width={[300, 500, 800]}
        justifyContent="center"
        alignItems="flex-end"
      >
        <TextField
          label="Buscar movil..."
          variant="outlined"
          sx={{ width: 200 }}
          margin="normal"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Stack>
      {currentMoviles.map((movil) => (
        <MovilCard key={movil.id} movil={movil} />
      ))}
      <Stack direction="row" spacing={2} justifyContent="center">
        {Array.from(
          { length: Math.ceil(filteredMoviles.length / itemsPerPage) },
          (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "contained" : "outlined"}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Button>
          )
        )}
      </Stack>
      {filteredMoviles.length === 0 && (
        <Typography variant="subtitle1">
          No se encontraron resultados
        </Typography>
      )}
    </Stack>
  );
};

export default MovilesPage;
