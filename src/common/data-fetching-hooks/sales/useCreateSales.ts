import { createSales } from "@/common/api/sale.apis";
import { TCreateSales } from "@/common/schema/SaleSchema";
import { queryClient } from "@/components/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useCreateSales = (saleDetails: TCreateSales) => {
  const router = useRouter();
  const { mutateAsync, isLoading: isSelling } = useMutation({
    mutationFn: createSales,
    onError(error: any, variables, context) {
      toast.error(error?.message)
    },
  });
  const handleMarkAsSold = () => {
    mutateAsync(saleDetails).then((res) => {
      if (res.status === 201) {
        router.push("/sales");
        queryClient.invalidateQueries({
          queryKey: ["fetch-products"],
        });
        queryClient.invalidateQueries({
          queryKey: ["fetch-sales"],
        });
        queryClient.invalidateQueries({
          queryKey: ["fetch-orders"]
        })
        queryClient.invalidateQueries({
          queryKey: ["fetch-all-products"],
        })
      }
    });
  };
  return { handleMarkAsSold, isSelling };
};
export default useCreateSales;