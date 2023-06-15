import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/hooks";
import { fetchAllProductsWithPagination } from "@/common/api/product.api";
import { fetchAllOrdersWithPagination } from "@/common/api/order.api";

const useFetchOrders = (page: number, limit: number) => {
  const { user } = useAuthContext();

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetch-orders", user?.business.id, page, limit],
    queryFn: () =>
      fetchAllOrdersWithPagination(user?.business.id!, page, limit),
  });
  return {
    data: response?.data,
    totalPages: response?.totalPages,
    totalItems: response?.totalItems,
    isLoading,
    isFetching,
    isError,
    error,
  };
};
export default useFetchOrders;
