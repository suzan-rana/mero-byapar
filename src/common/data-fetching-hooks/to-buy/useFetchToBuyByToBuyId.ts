import { useQuery } from "@tanstack/react-query";
import { fetchUserByUserId } from "@/common/api/user.api";
import { fetchToBuyByToBuyId } from "@/common/api/to-buy.api";
import { CreateProductType } from "@/common/schema/ProductSchema";

const useFetchToBuyByToBuyId = (toBuyId: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["fetch-tobuy-by-tobuyid", toBuyId],
    queryFn: () => fetchToBuyByToBuyId(toBuyId),
    enabled: !!toBuyId,
  });
  const productDetails =
    data &&
    ({
      product_name: data.product_name,
      businessId: data.businessId,
      categoryId: data.categoryId,
      description: data.product_name,
      price: data.product_price,
      quantity: data.quantity,
      toBuyId: data.id,
      buyerId: data.buyerId
    } as CreateProductType);
  return { data, isLoading, isFetching, productDetails };
};
export default useFetchToBuyByToBuyId;
