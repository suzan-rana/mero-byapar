import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/hooks";
import { fetchSales } from "@/common/api/sale.apis";
const useFetchSales = (page: number, limit: number) => {
    const { user } = useAuthContext();

    const {
      data: response,
      isLoading,
      isFetching,
      isError,
      error,
    } = useQuery({
      queryKey: ["fetch-sales", user?.business.id, page, limit],
      queryFn: () =>
      fetchSales(user?.business.id!, page, limit),
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
export default useFetchSales;
