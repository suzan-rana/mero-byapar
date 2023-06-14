import PageSubtitle from "@/components/PageSubtitle";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { TUpdateToBuy, UpdateToBuySchema } from "@/common/schema/ToBuySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { updateToBuyItem } from "@/common/api/to-buy.api";
import TextArea from "@/components/ui/TextArea";
import { CreateProductType } from "@/common/schema/ProductSchema";
import { queryClient } from "@/components/ReactQueryProvider";
import { useRouter } from "next/navigation";

const EditToBuyItem = (props: CreateProductType & { buy_from: string }) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<TUpdateToBuy>({
    defaultValues: {
      ...props,
      product_price: props.price,
    },
    resolver: zodResolver(UpdateToBuySchema),
  });
  const { mutateAsync } = useMutation({
    mutationFn: updateToBuyItem,
  });
  const onSubmit = (data: TUpdateToBuy) => {
    mutateAsync({
      ...data,
    }).then((response) => {
      if (response.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["fetch-tobuy-by-tobuyid"],
        });
        queryClient.invalidateQueries({
          queryKey: ["fetch-to-buy"],
        });
        router.refresh()
      }
    });
  };
  return (
    <section className="my-10">
      <PageSubtitle className="text-green-600">Edit ToBuy Item</PageSubtitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-[50%] grid grid-cols-1  gap-y-8 my-8"
      >
        <Label spanClassName="font-normal" name="Product Name">
          <Input
            error={errors.product_name}
            placeholder="Suzan Rana"
            {...register("product_name")}
          />
        </Label>
        <Label spanClassName="font-normal" name="Product Price">
          <Input error={errors.product_price} {...register("product_price")} />
        </Label>
        <Label spanClassName="font-normal" name="Minimum Quantity">
          <Input
            error={errors.quantity}
            type="number"
            placeholder="12"
            {...register("quantity")}
          />
        </Label>
        <Label spanClassName="font-normal" name="Description">
          <TextArea error={errors.description} {...register("description")} />
        </Label>
        <Label spanClassName="font-normal" name="Buy From">
          <Input
            error={errors.buy_from}
            placeholder="Clinic Plus"
            {...register("buy_from")}
          />
        </Label>
        <ButtonGroup>
          <Button type="submit" variant={"primary"}>
            Save
          </Button>
          <Button type="reset" variant={"outline"}>
            Clear
          </Button>
        </ButtonGroup>
      </form>
    </section>
  );
};

export default EditToBuyItem;
