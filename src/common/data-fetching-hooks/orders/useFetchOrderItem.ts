import { useQuery } from "@tanstack/react-query";
import { fetchOrderByOrderId } from "@/common/api/order.api";

const useFetchOrderByOrderId = (orderId: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["fetch-order-by-orderid", orderId],
    queryFn: () => fetchOrderByOrderId(orderId),
    enabled: !!orderId
  });
  return { data, isLoading, isFetching };
};
export default useFetchOrderByOrderId;
