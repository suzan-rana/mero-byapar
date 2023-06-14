import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/hooks";
import { fetchAllProductsWithPagination } from "@/common/api/product.api";

const useFetchProducts = (page: number, limit: number) => {
  const { user } = useAuthContext();

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetch-products", user?.business.id, page, limit],
    queryFn: () => fetchAllProductsWithPagination(user?.business.id!, page, limit),
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
export default useFetchProducts;
