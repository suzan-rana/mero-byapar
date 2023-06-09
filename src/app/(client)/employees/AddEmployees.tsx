import PageSubtitle from "@/components/PageSubtitle";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Link from "next/link";
import React from "react";
type Props = {};

const AddEmployees = (props: Props) => {
  return (
    <section>
      <PageSubtitle className="text-green-600">
        Add new employee to the Team!
      </PageSubtitle>
      <form className="w-[50%] grid grid-cols-1  gap-y-8 my-8">
        <Label spanClassName="font-normal" name="Name">
          <Input placeholder="Suzan Rana" />
        </Label>
        <Label spanClassName="font-normal" name="Email">
          <Input type="email" placeholder="dev.suzanrana@gmail.com" />
        </Label>
        <Label spanClassName="font-normal" name="Password">
          <Input type="password" placeholder="**********" />
        </Label>
        <Label spanClassName="font-normal" name="Contact">
          <Input type="number" placeholder="1234567890" />
        </Label>

        <Label spanClassName="font-normal" name="Position">
          <Input type="text" placeholder="Intern" />
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

export default AddEmployees;
