import { ChangeEvent, useState } from "react";
import { useNavigate } from "@/app/common/hooks/useNavigate";
import { useIngressOrders } from "@/app/ingress/hooks/useIngressOrders";
import { createOrderListData } from "../utils/createOrderListData";
import { Order } from "@/app/common/interfaces";

export const useOrderTables = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState<string | undefined>();
  const {
    data: ordersData,
    isLoading,
    isError,
  } = useIngressOrders(page, limit, search);
  const navigate = useNavigate();

  const handleCreateIngress = () => {
    navigate("/ingress/create-ingress");
  };

  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (value: string) => {
    setPage(0);
    if (value === "") {
      setSearch(undefined);
    } else {
      setSearch(value);
    }
  };

  const handleLimitChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    setLimit(parseInt(event.target.value, 10));
  };

  const orderRows = ordersData?.ingresses?.map((order: Order) => {
    return createOrderListData(
      order.id,
      order.date,
      order.order_number,
      order.repair_description,
      order.fuel_level.toString(),
      {
        id: order.movile.id,
        brand: order.movile.brand,
        model: order.movile.model,
        domain: order.movile.domain,
        internal_register: order.movile.internal_register,
        kilometers: order.kilometers,
      }
    );
  });

  return {
    ordersData,
    orderRows,
    isLoading,
    isError,
    search,
    page,
    rowsPerPage,
    handleCreateIngress,
    handlePageChange,
    handleLimitChange,
    handleSearchChange,
  };
};
