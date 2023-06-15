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
      console.log('DATA', data)
      toast.success(data.data?.message)
      router.push('/login')
    },
    onError(error: any){
      console.log('ERROR', error)
      toast.error(error?.error)
    }
  });

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
        <Label name="Name">
          <Input placeholder="suzan-rana" {...register("name")} />
        </Label>
        <Label name="Email">
          <Input placeholder="suzan-rana" {...register("email")} />
        </Label>
        <Label name="Password">
          <PasswordInputElement placeholder="********" {...register("password")} />
        </Label>
        <Label name="Contact">
          <Input
            type="number"
            placeholder="suzan-rana"
            {...register("contact_number")}
          />
        </Label>
        <Label name="Business Name">
          <Input placeholder="suzan-rana" {...register("business.name")} />
        </Label>
        <Label name="Business Email">
          <Input
            type="email"
            placeholder="suzan-rana"
            {...register("business.email")}
          />
        </Label>
        <Label name="Contact Number">
          <Input
            type="number"
            placeholder="suzan-rana"
            {...register("business.contact_number")}
          />
        </Label>
        <Label name="Description">
          <Input
            // type="number"
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
            {/* <Link href={"/login"} className="w-[100%] block h-[100%]"> */}
            Login
            {/* </Link> */}
          </Button>
        </ButtonGroup>
      </form>
    </section>
  );
};

export default RegisterPage;
