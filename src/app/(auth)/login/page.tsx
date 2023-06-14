'use client';
import { loginUser } from "@/common/api/user.api";
import { LoginUserSchema, loginUserType } from "@/common/schema/UserSchema";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/hooks";
type Props = {};

const LoginPage = (props: Props) => {
  const { setIsAuthenticated } = useAuthContext();

  const router = useRouter()
  const { register, handleSubmit, formState: { errors} } = useForm<loginUserType>({
    resolver: zodResolver(LoginUserSchema),
  });
  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess(data, variables, context) {
      toast.success(data?.message);
      setIsAuthenticated(true)
      Cookies.set("token", data.token);
      router.push('/home')
    },
    onError(error: any, variables, context) {
      toast.error(error.message)
    },
  });
  const onSubmit = (data: loginUserType) => {
    mutate(data);
  };
  return (
    <section className="ml-auto  min-h-[50vh] sm:w-[80%] sm:mx-auto">
      {" "}
      <h1 className="text-2xl text-green-700 capitalize  font-bold mt-4 mb-12 text-center">
        MeroByapar Login
      </h1>{" "}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Label name="Email">
          <Input error={errors.email} placeholder="dev.suzanrana@gmail.com" {...register("email")} />
        </Label>
        <Label name="Password">
          <Input error={errors.password} {...register("password")} placeholder="********" />
        </Label>
        <ButtonGroup>
          <Button type="submit" variant={"primary"}>
            Login
          </Button>
          <Button type="button" variant={"outline"}>
            <Link href={"/register  "} className="w-[100%] block h-[100%]">
              Register
            </Link>
          </Button>
        </ButtonGroup>
      </form>
    </section>
  );
};

export default LoginPage;
