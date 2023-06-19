"use client";
import { createCategory } from "@/common/api/category.api";
import useLoader from "@/common/hooks/useLoader";
import {
  CreateCategorySchema,
  TCreateCategory,
} from "@/common/schema/CategorySchema";
import PageTitle from "@/components/PageTitle";
// import { queryClient } from "@/components/ReactQueryProvider";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useAuthContext } from "@/context/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

type Props = {};

const CategoryPage = (props: Props) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<TCreateCategory, "category_code" | "category_name">>({
    resolver: zodResolver(
      CreateCategorySchema.pick({
        category_code: true,
        category_name: true,
      })
    ),
  });
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: createCategory,
    async onSuccess(data, variables, context) {
      if (data.status === 201 || data.status === 200) {
        await queryClient.invalidateQueries({
          queryKey: ["fetch-category"],
        });
        router.push("/products");
      }
    },

  });
  const queryClient = useQueryClient();
  useLoader(isLoading);

  const onSubmit = (
    data: Pick<TCreateCategory, "category_code" | "category_name">
  ) => {
    mutateAsync({
      ...data,
      businessId: user?.business.id as string,
    }).then((response) => {});
  };

  return (
    <main>
      <PageTitle>Add new Category</PageTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-[50%] grid grid-cols-1  gap-y-8 my-8"
      >
        <Label
          error={errors.category_name}
          spanClassName="font-normal"
          name="Category Name"
        >
          <Input
            error={errors.category_name}
            placeholder="Science and Technology"
            {...register("category_name")}
          />
        </Label>
        <Label
          error={errors.category_code}
          spanClassName="font-normal"
          name="Category Code"
        >
          <Input
            error={errors.category_code}
            placeholder="UQ123"
            className="uppercase"
            {...register("category_code")}
          />
        </Label>
        <ButtonGroup>
          <Button type="submit" variant={"primary"}>
            Create
          </Button>
          <Button variant={"outline"}>
            <Link className="w-full block h-full" href={"/products"}>
              Cancel
            </Link>
          </Button>
        </ButtonGroup>
      </form>
    </main>
  );
};

export default CategoryPage;
