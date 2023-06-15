import { createOrder } from "@/common/api/order.api";
import useLoader from "@/common/hooks/useLoader";
import { TCreateOrder } from "@/common/schema/OrderSchema";
import { useMutation } from "@tanstack/react-query";

export default function useCreateOrder() {
  const { mutateAsync,isLoading: isCreating } = useMutation({
    mutationFn: createOrder,
  });
  useLoader(isCreating)
  return { mutateAsync, isCreating}
}
