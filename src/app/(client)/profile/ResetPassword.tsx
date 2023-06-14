"use client";
import PageSubtitle from "@/components/PageSubtitle";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Label from "@/components/ui/Label";
import React from "react";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordSchema,
  TResetPassword,
} from "@/common/schema/UserSchema";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/common/api/user.api";
import { useAuthContext } from "@/context/hooks";

type Props = {};

const ResetPassword = (props: Props) => {
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<TResetPassword>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const { mutateAsync } = useMutation({
    mutationFn: ({
      id,
      passwordDetails,
    }: {
      id: string;
      passwordDetails: TResetPassword;
    }) => resetPassword(id, passwordDetails),
  });
  const onSubmit = (data: TResetPassword) => {
    mutateAsync({ id: user?.id!, passwordDetails: data }).then((response) => {
      if (response.status === 201) {
        reset();
      }
    });
  };
  return (
    <section className="my-10">
      <PageSubtitle className="text-green-600">Change Password </PageSubtitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-[50%] grid grid-cols-1  gap-y-8 my-8"
      >
        <Label spanClassName="font-normal" name="Old Password">
          <Input
            error={errors.old_password}
            placeholder="Old Password"
            {...register("old_password")}
          />
        </Label>
        <Label spanClassName="font-normal" name="New Password">
          <Input
            error={errors.new_password}
            placeholder="New Password"
            {...register("new_password")}
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

export default ResetPassword;
