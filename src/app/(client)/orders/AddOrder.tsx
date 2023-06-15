"use client";
import useCreateOrder from "@/common/data-fetching-hooks/orders/useCreateOrder";
import useFetchAllProducts from "@/common/data-fetching-hooks/products/useFetchAllProducts";
import { CreateOrderSchema, TCreateOrder } from "@/common/schema/OrderSchema";
import PageSubtitle from "@/components/PageSubtitle";
import { queryClient } from "@/components/ReactQueryProvider";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";
import SkeletonCard from "@/components/ui/Skeleton/SkeletonCard";
import { useAuthContext } from "@/context/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
type Props = {};

const AddOrder = (props: Props) => {
  const { user } = useAuthContext();
  const { data, isLoading, isFetching } = useFetchAllProducts(
    user?.business.id!
  );
  const {
    register,
    getValues,
    setValue,
    setError,
    control,
    clearErrors,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TCreateOrder & { total_price: number }>({
    defaultValues: {
      businessId: user?.business.id,
      price: 1,
      quantity: 1,
      total_price: 1,
    },
    resolver: zodResolver(
      CreateOrderSchema.extend({
        total_price: z.number().min(1),
      })
    ),
  });
  const router = useRouter()

  const { isCreating, mutateAsync } = useCreateOrder();

  if (!data || isFetching || isLoading) {
    return <SkeletonCard />;
  }
  const onSubmit = (data: TCreateOrder) => {
    mutateAsync(data).then((response) => {
      if (response.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["fetch-orders"],
        });
        queryClient.invalidateQueries({
          queryKey: ["fetch-all-products"],
        })
        reset()
        router.refresh()
      }
    });
  };

  return (
    <section>
      <PageSubtitle className="text-green-600">
        Someone just ordered now, Create one!
      </PageSubtitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-[50%] grid grid-cols-1  gap-y-8 my-8"
      >
        <Label
          spanClassName="font-normal"
          error={errors.customer_name}
          name="Buyer Name"
        >
          <Input
            placeholder="Suzan Rana"
            error={errors.customer_name}
            {...register("customer_name")}
          />
        </Label>
        <Label
          spanClassName="font-normal"
          error={errors.customer_email}
          name="Buyer Email"
        >
          <Input
            type="email"
            placeholder="dev.suzanrana@gmail.com"
            error={errors.customer_email}
            {...register("customer_email")}
          />
        </Label>
        <Label
          spanClassName="font-normal"
          error={errors.customer_contact_number}
          name="Buyer Contact"
        >
          <Input
            type="number"
            placeholder="1234567890"
            error={errors.customer_contact_number}
            {...register("customer_contact_number")}
          />
        </Label>
        <Label
          error={errors.productId}
          spanClassName="font-normal"
          name="Product Name"
        >
          <Controller
            control={control}
            name="productId"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <Select
                onBlur={onBlur} // notify when input is touched
                onChange={(event) => {
                  const selectedProduct = data.find(
                    (p, i) => p.id === event.target.value
                  );
                  setValue("price", selectedProduct?.price!);
                  onChange(event);
                }} // send value to hook form
                ref={ref}
                error={error}
              >
                <option defaultChecked>Select a product</option>
                {data.map((product, index) => (
                  <option value={product.id} key={product.id}>
                    {product.product_name}
                  </option>
                ))}
              </Select>
            )}
          />
        </Label>
        <Label
          error={errors.quantity}
          spanClassName="font-normal"
          name="Quantity"
        >
          <Input
            error={errors.quantity}
            type="number"
            min={1}
            placeholder="12"
            {...register("quantity", {
              min: 1,
              valueAsNumber: true,
              onChange(event) {
                const selectedProduct = data.find(
                  (p, i) => p.id === getValues("productId")
                );
                setValue(
                  "total_price",
                  +getValues("price") * +event.target.value
                );
                if (event.target.value > selectedProduct?.quantity!) {
                  console.log('SELECTED PRODUCT', selectedProduct)
                  setError("quantity", {
                    message: `Maximum quantity can only be upto ${selectedProduct?.quantity}`,
                  });
                } else {
                  clearErrors("quantity");
                }
              },
            })}
          />
        </Label>
        <Label spanClassName="font-normal" name="Price">
          <Input
            disabled
            type="number"
            min={1}
            placeholder="12"
            {...register("price", {
              min: 1,
            })}
          />
        </Label>
        <Label spanClassName="font-normal" name="Total Price">
          <Input
            disabled
            type="number"
            min={1}
            placeholder="12"
            {...register("total_price", { min: 1 })}
          />
        </Label>
        <ButtonGroup>
          <Button type="submit" variant={"primary"}>
            Create
          </Button>
          <Button type="reset" variant={"outline"}>
            Clear
          </Button>
        </ButtonGroup>
      </form>
    </section>
  );
};

export default AddOrder;
