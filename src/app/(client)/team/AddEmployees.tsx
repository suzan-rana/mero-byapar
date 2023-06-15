"use client";
import PageSubtitle from "@/components/PageSubtitle";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Input, { PasswordInputElement } from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateNewUserSchema,
  CreateNewUserType,
} from "@/common/schema/UserSchema";
import { useAuthContext } from "@/context/hooks";
import { useMutation } from "@tanstack/react-query";
import Select from "@/components/ui/Select";
import { createNewUser } from "@/common/api/user.api";
import { queryClient } from "@/components/ReactQueryProvider";
type Props = {};

const AddEmployees = (props: Props) => {
  const { user } = useAuthContext();

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<CreateNewUserType, "businessId">>({
    resolver: zodResolver(
      CreateNewUserSchema.omit({
        businessId: true,
      })
    ),
  });
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: createNewUser,
  });
  const onSubmit = (data: Omit<CreateNewUserType, "businessId">) => {
    mutateAsync({
      ...data,
      businessId: user?.business.id!,
    }).then((res) => {
      if (res.status === 201) {
        reset();
        queryClient.invalidateQueries({
          queryKey: ["fetch-users"]
        })
      }
    });
  };
  return (
    <section>
      <PageSubtitle className="text-green-600">
        Add new employee to the Team!
      </PageSubtitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-[50%] grid grid-cols-1  gap-y-8 my-8"
      >
        <Label spanClassName="font-normal" name="Name">
          <Input
            error={errors.name}
            placeholder="Suzan Rana"
            {...register("name")}
          />
        </Label>
        <Label spanClassName="font-normal" name="Email">
          <Input
            error={errors.email}
            placeholder="dev.suzanrana@gmail.com"
            {...register("email")}
          />
        </Label>
        <Label spanClassName="font-normal" name="Password">
          <PasswordInputElement
            error={errors.password}
            type="password"
            placeholder="**********"
            {...register("password")}
          />
        </Label>
        <Label spanClassName="font-normal" name="Contact">
          <Input
            error={errors.contact_number}
            type="number"
            placeholder="1234567890"
            {...register("contact_number")}
          />
        </Label>

        <Label spanClassName="font-normal" name="Position">
          <Select error={errors.role_name} {...register("role_name")}>
            <option>Select role</option>
            <option value={"ADMIN"}>Admin</option>
            <option value={"EMPLOYEE"}>Employee</option>
            <option value={"INTERN"}>Intern</option>
          </Select>
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

export default AddEmployees;
