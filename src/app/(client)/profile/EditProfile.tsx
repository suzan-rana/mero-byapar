import PageSubtitle from "@/components/PageSubtitle";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";
import { errors } from "jose";
import React from "react";
import Input from "@/components/ui/Input";
import { useAuthContext } from "@/context/hooks";
import { useForm } from "react-hook-form";
import {
  TUpdateProfile,
  UpdateProfileSchema,
} from "@/common/schema/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/common/api/user.api";
import { queryClient } from "@/components/ReactQueryProvider";

type Props = {};

const EditProfile = (props: Props) => {
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<TUpdateProfile>({
    defaultValues: {
      name: user?.name,
      contact_number: user?.contact_number,
    },
    resolver: zodResolver(UpdateProfileSchema),
  });
  const { mutateAsync } = useMutation({
    mutationFn: ({
      id,
      profileDetails,
    }: {
      id: string;
      profileDetails: TUpdateProfile;
    }) => updateProfile(id, profileDetails),
  });
  const onSubmit = (data: TUpdateProfile) => {
    mutateAsync({ id: user?.id!, profileDetails: data }).then((response) => {
      if (response.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["fetch-current-user"],
        });
        reset();
      }
    });
  };
  return (
    <section className="my-10">
      <PageSubtitle className="text-green-600">Edit Profile</PageSubtitle>
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
        <Label spanClassName="font-normal" name="Contact">
          <Input
            error={errors.contact_number}
            type="number"
            placeholder="1234567890"
            {...register("contact_number")}
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

export default EditProfile;
