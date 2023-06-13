import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/hooks";
import { fetchAllProducts } from "@/common/api/product.api";

const useFetchProducts = () => {
  const { user } = useAuthContext();

  const { data, isLoading, isFetching , isError, error} = useQuery({
    queryKey: ["fetch-products", user?.business.id],
    queryFn: () => fetchAllProducts(user?.business.id!),
  });
  return { data, isLoading, isFetching, isError, error };
};
export default useFetchProducts;
