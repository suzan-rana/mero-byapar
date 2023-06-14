import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/hooks";
import { fetchToBuy } from "@/common/api/to-buy.api";

const useFetchToBuy = (page: number, limit: number) => {
  const { user } = useAuthContext();

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["fetch-to-buy", user?.business.id, page, limit],
    queryFn: () =>
      fetchToBuy({ businessId: user?.business.id!, page, limit}),
  });
  return { data: response?.data, totalItems: response?.totalItems, totalPages: response?.totalPages, isLoading, isFetching, isError };
};
export default useFetchToBuy;
