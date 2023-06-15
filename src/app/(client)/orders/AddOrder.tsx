"use client";
import useFetchAllProducts from "@/common/data-fetching-hooks/products/useFetchAllProducts";
import { CreateOrderSchema, TCreateOrder } from "@/common/schema/OrderSchema";
import PageSubtitle from "@/components/PageSubtitle";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";
import SkeletonCard from "@/components/ui/Skeleton/SkeletonCard";
import { useAuthContext } from "@/context/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
type Props = {};

const AddOrder = (props: Props) => {
  const { user } = useAuthContext();
  const { data, isLoading, isFetching } = useFetchAllProducts(
    user?.business.id!
  );
  const {
    watch,
    register,
    getValues,
    setValue,
    setError,
    control,
    resetField,
    clearErrors,
    formState: { errors },
  } = useForm<TCreateOrder>({
    resolver: zodResolver(CreateOrderSchema),
  });
  console.log(getValues("productId"), "HI");

  if (!data || isFetching || isLoading) {
    return <SkeletonCard />;
  }
  return (
    <section>
      <PageSubtitle className="text-green-600">
        Someone just ordered now, Create one!
      </PageSubtitle>
      <form className="sm:w-[50%] grid grid-cols-1  gap-y-8 my-8">
        <Label spanClassName="font-normal" name="Buyer Name">
          <Input placeholder="Suzan Rana" />
        </Label>
        <Label spanClassName="font-normal" name="Buyer Email">
          <Input type="email" placeholder="dev.suzanrana@gmail.com" />
        </Label>
        <Label spanClassName="font-normal" name="Buyer Contact">
          <Input type="number" placeholder="1234567890" />
        </Label>
        <Label spanClassName="font-normal" name="Product Name">
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
                onChange={onChange} // send value to hook form
                ref={ref}
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
        <Label spanClassName="font-normal" name="Quantity">
          <Input
            error={errors.quantity}
            type="number"
            placeholder="12"
            {...register("quantity", {
              onChange(event) {
                const selectedProduct = data.find(
                  (p, i) => p.id === getValues("productId")
                );
                console.log("PRODUCT", selectedProduct);
                if (event.target.value > selectedProduct?.quantity!) {
                  setError("quantity", {
                    message: `Maximum quantity can only be upto ${selectedProduct?.quantity}`,
                  });
                } else {
                  clearErrors('quantity')
                }
              },
            })}
          />
        </Label>
        <Label spanClassName="font-normal" name="Price">
          <Input type="number" placeholder="12" />
        </Label>
        <Label spanClassName="font-normal" name="Total Price">
          <Input type="number" placeholder="12" />
        </Label>
        <ButtonGroup>
          <Button variant={"primary"}>Create</Button>
          <Button type="reset" variant={"outline"}>
            Clear
          </Button>
        </ButtonGroup>
      </form>
    </section>
  );
};

export default AddOrder;
