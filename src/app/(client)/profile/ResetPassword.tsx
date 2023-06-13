import PageSubtitle from "@/components/PageSubtitle";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";
import { errors } from "jose";
import React from "react";
import Input from "@/components/ui/Input";

type Props = {};

const ResetPassword = (props: Props) => {
  return (
    <section className="my-10">
      <PageSubtitle className="text-green-600">Change Password </PageSubtitle>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="sm:w-[50%] grid grid-cols-1  gap-y-8 my-8"
      >
        <Label spanClassName="font-normal" name="Old Password">
          <Input
            // error={errors.name}
            placeholder="Old Password"
            // {...register("name")}
          />
        </Label>
        <Label spanClassName="font-normal" name="New Password">
          <Input
            // error={errors.contact_number}
            placeholder="New Password"
            // {...register("contact_number")}
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
