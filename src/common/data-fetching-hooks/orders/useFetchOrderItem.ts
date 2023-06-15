import { useQuery } from "@tanstack/react-query";
import { fetchOrderByOrderId } from "@/common/api/order.api";
import { TCreateSales } from "@/common/schema/SaleSchema";
import { useAuthContext } from "@/context/hooks";

const useFetchOrderByOrderId = (orderId: string) => {
  const { user } = useAuthContext();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["fetch-order-by-orderid", orderId],
    queryFn: () => fetchOrderByOrderId(orderId),
    enabled: !!orderId,
  });
  const salesDetails =
    data &&
    ({
      businessId: user?.business.id,
      orderId: data.id,
      productId: data.product.id,
      sellerId: user?.id,
      sold_price: +data.order_quantity * +data.product.price,
      sold_quantity: data.order_quantity,
      soldTo: {
        contact_number: data.customer_contact_number,
        email: data.customer_email,
        name: data.customer_name,
      },
    } as TCreateSales);
  return { data, isLoading, isFetching, salesDetails };
};
export default useFetchOrderByOrderId;
