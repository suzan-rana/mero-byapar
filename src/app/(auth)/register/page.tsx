"use client";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Input, { PasswordInputElement } from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateRootUserSchema,
  CreateRootUserType,
} from "@/common/schema/UserSchema";
import axios from "axios";
import { createRootUser } from "@/common/api/user.api";
import { toast }from 'react-toastify'
import { useRouter } from "next/navigation";
import useLoader from "@/common/hooks/useLoader";

type Props = {};

const RegisterPage = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRootUserType>({
    resolver: zodResolver(CreateRootUserSchema),
  });
  const router = useRouter()

  // posting data to backend
  const { isLoading, mutate } = useMutation({
    mutationFn: createRootUser,
   onSuccess(data, variables, context) {
      toast.success(data.data?.message)
      router.push('/login')
    },
    onError(error: any){
      toast.error(error?.response.message)
    }
  });
  useLoader(isLoading)

  const onSubmit = (data: CreateRootUserType) => {
    mutate(data)
  };

  return (
    <section className="ml-auto  min-h-[50vh] max-h-[100vh] overflow-y-scroll grow sm:w-[80%] sm:mx-auto">
      {" "}
      <h1 className="text-2xl text-green-700 capitalize  font-bold mt-4 mb-12 text-center">
        MeroByapar Registration
      </h1>{" "}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit);
        }}
        className="grid w-[90%] mx-auto sm:w-auto sm:mx-0 sm:grid-cols-2 gap-5"
      >
        <Label error={errors.name} name="Name">
          <Input error={errors.name} placeholder="suzan-rana" {...register("name")} />
        </Label>
        <Label error={errors.email} name="Email">
          <Input  error={errors.email} placeholder="suzan-rana" {...register("email")} />
        </Label>
        <Label error={errors.password} name="Password">
          <PasswordInputElement error={errors.password} placeholder="********" {...register("password")} />
        </Label>
        <Label           error={errors.contact_number}
 name="Contact">
          <Input
          error={errors.contact_number}
            type="number"
            placeholder="suzan-rana"
            {...register("contact_number")}
          />
        </Label>
        <Label error={errors.business.name} name="Business Name">
          <Input error={errors.business.name} placeholder="suzan-rana" {...register("business.name")} />
        </Label>
        <Label error={errors.business.email} name="Business Email">
          <Input
          error={errors.business.email}
            type="email"
            placeholder="suzan-rana"
            {...register("business.email")}
          />
        </Label>
        <Label error={errors.business.contact_number} name="Contact Number">
          <Input error={errors.business.contact_number}
            type="number"
            placeholder="suzan-rana"
            {...register("business.contact_number")}
          />
        </Label>
        <Label             error={errors.business.description}
 name="Description">
          <Input
            error={errors.business.description}
            placeholder="suzan-rana"
            {...register("business.description")}
          />
        </Label>
        <ButtonGroup>
          {" "}
          <Button
            onClick={handleSubmit(onSubmit)}
            type="button"
            variant={"primary"}
          >
            Register
          </Button>
          <Button type="button" variant={"outline"}>
            Login
          </Button>
        </ButtonGroup>
      </form>
    </section>
  );
};

export default RegisterPage;
