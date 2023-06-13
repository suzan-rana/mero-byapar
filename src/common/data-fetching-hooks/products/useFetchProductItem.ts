import { useQuery } from "@tanstack/react-query";
import { fetchProductByProductId } from "@/common/api/product.api";

const useFetchProductByProductId = (productId: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["fetch-product-by-productid", productId],
    queryFn: () => fetchProductByProductId(productId),
    enabled: !!productId
  });
  return { data, isLoading, isFetching };
};
export default useFetchProductByProductId;
