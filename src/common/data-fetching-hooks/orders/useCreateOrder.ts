import { createOrder } from "@/common/api/order.api";
import { TCreateOrder } from "@/common/schema/OrderSchema";
import { useMutation } from "@tanstack/react-query";

export default function useCreateOrder() {
  const { mutateAsync,isLoading: isCreating } = useMutation({
    mutationFn: createOrder,
  });

  return { mutateAsync, isCreating}
}
