import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/hooks";
import { fetchToBuy } from "@/common/api/to-buy.api";

const useFetchToBuy = () => {
  const { user } = useAuthContext();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["fetch-to-buy", user?.business.id],
    queryFn: () => fetchToBuy({ businessId: user?.business.id! }),
  });
  return { data, isLoading, isFetching, isError };
};
export default useFetchToBuy;
