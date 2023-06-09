import { deleteOrder } from "@/common/api/order.api";
import useLoader from "@/common/hooks/useLoader";
import { queryClient } from "@/components/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useDeleteOrderById = (orderId: string) => {
  const router = useRouter();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: deleteOrder,
  });
  const handleDelete = () => {
    mutateAsync(orderId).then((response) => {
      if (response.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["fetch-orders"],
        });
        router.push(`/orders`);
      }
    });
  };
  useLoader(isLoading)

  return { handleDelete, isLoading };
};
export default useDeleteOrderById;
