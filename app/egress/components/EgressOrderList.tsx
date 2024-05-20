"use client";

import React from "react";
import { Stack, TablePagination, Typography } from "@mui/material";
import { useEgressOrders } from "../hooks/useEgressOrders";
import ViewListIcon from "@mui/icons-material/ViewList";
import { EgressOrderTable } from "./EgressOrdersTable";
import { useOrdersTables } from "@/app/common/hooks/useOrdersTable";

export const EgressOrdersList = () => {
  const {
    ordersData,
    isLoading,
    isError,
    search,
    page,
    rowsPerPage,
    handlePageChange,
    handleLimitChange,
    handleSearchChange,
  } = useOrdersTables({
    fetchOrdersFunction: useEgressOrders,
    entity: "egress",
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  if (!ordersData || !Array.isArray(ordersData))
    return (
      <Stack
        height="100vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Typography component="h2" fontSize={24}>
          No hay ordenes de egreso
        </Typography>
      </Stack>
    );

  return (
    <Stack width={["100%", "100%", "70%"]}>
      <Stack
        direction="row"
        gap={1}
        justifyContent="center"
        alignItems="center"
      >
        <ViewListIcon fontSize="large" />
        <Typography fontSize={[24, 48]} mb={5} mt={5} component="h2">
          Ordenes de egreso
        </Typography>
      </Stack>
      <EgressOrderTable
        orders={ordersData.egressOrders}
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
    </Stack>
  );
};
