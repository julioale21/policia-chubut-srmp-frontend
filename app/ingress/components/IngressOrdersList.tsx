"use client";
import React from "react";

import { Button, Stack, TablePagination, Typography } from "@mui/material";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import ViewListIcon from "@mui/icons-material/ViewList";
import { IngressOrderTable } from "./IngressOrderTable";
import { useOrdersTables } from "@/app/common/hooks/useOrdersTable";
import { useIngressOrders } from "../hooks/useIngressOrders";

export const IngressOrdersList = () => {
  const {
    ordersData,
    isLoading,
    isError,
    page,
    rowsPerPage,
    search,
    handlePageChange,
    handleLimitChange,
    handleCreateEntity,
    handleSearchChange,
  } = useOrdersTables({
    fetchOrdersFunction: useIngressOrders,
    entity: "ingress",
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!ordersData.ingresses) return <div>No orders</div>;

  return (
    <Stack width="70%">
      <Stack
        direction="row"
        gap={1}
        justifyContent="center"
        alignItems="center"
      >
        <ViewListIcon fontSize="large" />
        <Typography fontSize={[24, 48]} mb={5} mt={5} component="h2">
          Ordenes de ingreso
        </Typography>
      </Stack>
      <IngressOrderTable
        orders={ordersData.ingresses}
        handleSearch={handleSearchChange}
        searchTerm={search}
      />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={ordersData.total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        labelRowsPerPage="Resultados por pagina"
      />
      <Stack
        mt={3}
        mb={10}
        width="100%"
        direction="row"
        justifyContent="flex-end"
      >
        <Button
          variant="outlined"
          endIcon={<AddOutlinedIcon />}
          onClick={handleCreateEntity}
        >
          Crear orden
        </Button>
      </Stack>
    </Stack>
  );
};
