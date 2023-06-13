import { createNewProduct } from "@/common/api/product.api";
import { CreateProductType } from "@/common/schema/ProductSchema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCreateProduct = (productDetails: CreateProductType) => {
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: createNewProduct,
  });
  const handleMarkAsBought = () => {
    mutateAsync(productDetails).then((res) => {
      if (res.status === 201) {
        router.push("/to-buy");
      }
    });
  };
  return { handleMarkAsBought };
};