import PageSubtitle from "@/components/PageSubtitle";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Link from "next/link";
import React from "react";

type Props = {};

const AddOrder = (props: Props) => {
  return (
    <section>
      <PageSubtitle className="text-green-600">
        Someone just ordered now, Create one!
      </PageSubtitle>
      <form className="w-[50%] grid grid-cols-1  gap-y-8 my-8">
        <Label spanClassName="font-normal" name="Buyer Name">
          <Input placeholder="Suzan Rana" />
        </Label>
        <Label spanClassName="font-normal" name="Buyer Email">
          <Input type="email" placeholder="dev.suzanrana@gmail.com" />
        </Label>
        <Label spanClassName="font-normal" name="Buyer Contact">
          <Input type="number" placeholder="1234567890" />
        </Label>
        <Label spanClassName="font-normal" name="Product Name">
          <Input placeholder="Science and Technology" />
        </Label>
        <Label spanClassName="font-normal" name="Quantity">
          <Input type="number" placeholder="12" />
        </Label>
        <Label spanClassName="font-normal" name="Price">
          <Input type="number" placeholder="12" />
        </Label>
        <ButtonGroup>
          <Button variant={"primary"}>Create</Button>
          <Button type="reset" variant={"outline"}>Clear</Button>
        </ButtonGroup>
      </form>
    </section>
  );
};

export default AddOrder;
