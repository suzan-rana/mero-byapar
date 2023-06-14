import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/common/api/product.api";

const useFetchProductByProductId = (businessId: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["fetch-all-products"],
    queryFn: () => fetchAllProducts(businessId),
    enabled: !!businessId
  });
  return { data, isLoading, isFetching };
};
export default useFetchProductByProductId;
