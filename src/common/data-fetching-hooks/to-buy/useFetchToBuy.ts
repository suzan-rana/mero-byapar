import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "../../api/category.api";
import { useAuthContext } from "@/context/hooks";
import { fetchToBuy } from "@/common/api/to-buy.api";

const useFetchToBuy = () => {
  const { user } = useAuthContext();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["fetch-to-buy", user?.business.id],
    queryFn: () => fetchToBuy({ businessId: user?.business.id! }),
  });
  return { data, isLoading, isFetching };
};
export default useFetchToBuy;
