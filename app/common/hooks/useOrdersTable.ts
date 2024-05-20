import { ChangeEvent, useState } from "react";
import { useNavigate } from "@/app/common/hooks/useNavigate";
import { EgressOrder } from "@/app/egress/types";

interface OrderTableProps {
  fetchOrdersFunction: (page: number, limit: number, search?: string) => any;
  entity: string;
}

interface Orders {
  egressOrders: EgressOrder[];
  total: number;
}

export const useOrdersTables = ({
  fetchOrdersFunction,
  entity,
}: OrderTableProps) => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState<string | undefined>();

  const {
    data: ordersData,
    isLoading,
    isError,
  }: {
    data: Orders;
    isLoading: boolean;
    isError: boolean;
  } = fetchOrdersFunction(page, limit, search);

  const handleCreateEntity = () => {
    navigate(`/${entity}/create-${entity}`);
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

  return {
    ordersData,
    isLoading,
    isError,
    search,
    page,
    rowsPerPage,
    handleCreateEntity,
    handlePageChange,
    handleLimitChange,
    handleSearchChange,
  };
};
