import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "../../api/category.api";
import { useAuthContext } from "@/context/hooks";

const useFetchCategories = () => {
  const { user } = useAuthContext();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["fetch-category", user?.business.id],
    queryFn: () => fetchCategory({ businessId: user?.business.id! }),
  });
  return { data, isLoading, isFetching}
};
export default useFetchCategories