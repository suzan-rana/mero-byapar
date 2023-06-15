"use client";
import { createToBuy } from "@/common/api/to-buy.api";
import useFetchCategories from "@/common/data-fetching-hooks/categories/useFetchCategories";
import useLoader from "@/common/hooks/useLoader";
import { CreateToBuySchema, TCreateToBuy } from "@/common/schema/ToBuySchema";
import PageSubtitle from "@/components/PageSubtitle";
import { queryClient } from "@/components/ReactQueryProvider";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";
import TextArea from "@/components/ui/TextArea";
import { useAuthContext } from "@/context/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {};

const AddBuyingItem = (props: Props) => {
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<TCreateToBuy, "businessId">>({
    resolver: zodResolver(
      CreateToBuySchema.omit({
        businessId: true,
      })
    ),
  });
  const { data } = useFetchCategories();
  const {
    mutateAsync,
    isLoading: isMutating,
    isError,
  } = useMutation({
    mutationFn: createToBuy,
  });
  useLoader(isMutating)
  const onSubmit = (data: Omit<TCreateToBuy, "businessId">) => {
    mutateAsync({
      ...data,
      businessId: user?.business.id!,
    }).then((res) => {
      if (res.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["fetch-to-buy"],
        });
        reset();
      }
    });
  };


  return (
    <section>
      <PageSubtitle className="text-green-600">
        Add new item to buying list
      </PageSubtitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-[50%] grid grid-cols-1  gap-y-8 my-8"
      >
        <Label error={errors.product_name} spanClassName="font-normal" name="Product Name">
          <Input
            error={errors.product_name}
            placeholder="Clinic Plus"
            {...register("product_name")}
          />
        </Label>
        <Label  error={errors.product_code} spanClassName="font-normal" name="Product Code">
          <Input
            error={errors.product_code}
            placeholder="SHA-123"
            {...register("product_code")}
            className="uppercase"
          />
        </Label>
        <Label error={errors.product_price} spanClassName="font-normal" name="Product Price">
          <Input
            error={errors.product_price}
            placeholder="Clinic Plus"
            {...register("product_price")}
            type="number"
          />
        </Label>
        <Label  error={errors.categoryId}  spanClassName="font-normal" name="Product Category">
          <Select error={errors.categoryId} {...register("categoryId")}>
            <option unselectable={"on"} value={""}>
              Select Category
            </option>
            {data?.map((option, index) => (
              <option key={index} value={option.id}>
                {option.category_name}
              </option>
            ))}
          </Select>
        </Label>
        <Label error={errors.quantity} spanClassName="font-normal" name="Minimum Quantity">
          <Input
            error={errors.quantity}
            type="number"
            placeholder="12"
            {...register("quantity")}
          />
        </Label>
        <Label  error={errors.description} spanClassName="font-normal" name="Description">
          <TextArea
            error={errors.description}
            placeholder="Write a description of your product in more than 10 words."
            {...register("description")}
          />
        </Label>
        <Label error={errors.buy_from} spanClassName="font-normal" name="Buy From">
          <Input
            error={errors.buy_from}
            placeholder="Clinic Plus"
            {...register("buy_from")}
          />
        </Label>
        <Label error={errors.deadline_date} spanClassName="font-normal" name="Deadline to buy">
          <Input
            error={errors.deadline_date}
            type="date"
            {...register("deadline_date")}
          />
        </Label>
        <ButtonGroup>
          <Button type="submit" variant={"primary"}>
            Add
          </Button>
          <Button type="reset" variant={"outline"}>
            Clear
          </Button>
        </ButtonGroup>
      </form>
    </section>
  );
};

export default AddBuyingItem;
