import { deleteToBuyItem } from "@/common/api/to-buy.api";
import useLoader from "@/common/hooks/useLoader";
import { queryClient } from "@/components/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useDeleteToBuy = (toBuyId: string) => {
  const router = useRouter();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: deleteToBuyItem,
  });
  const handleDelete = () => {
    mutateAsync(toBuyId).then((response) => {
      if (response.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["fetch-to-buy"],
        });
        router.push(`/to-buy`);
      }
    });
  };
  useLoader(isLoading)

  return { handleDelete, isLoading };
};
export default useDeleteToBuy;
