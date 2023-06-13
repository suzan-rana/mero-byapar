import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "../../api/category.api";
import { useAuthContext } from "@/context/hooks";

const useFetchCategories = () => {
  const { user } = useAuthContext();

  const { data, isLoading, isFetching,isError } = useQuery({
    queryKey: ["fetch-category", user?.business.id],
    queryFn: () => fetchCategory({ businessId: user?.business.id! }),
  });
  return { data, isLoading, isFetching, isError}
};
export default useFetchCategories