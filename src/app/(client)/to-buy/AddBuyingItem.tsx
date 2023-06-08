import PageSubtitle from "@/components/PageSubtitle";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Link from "next/link";
import React from "react";

type Props = {}

const AddBuyingItem = (props: Props) => {
    return (
        <section>
          <PageSubtitle className="text-green-600">
            Add new item to buying list
          </PageSubtitle>
          <form className="w-[50%] grid grid-cols-1  gap-y-8 my-8">

            <Label spanClassName="font-normal" name="Product Name">
              <Input placeholder="Clinic Plus" />
            </Label>
            <Label spanClassName="font-normal" name="Product Category">
              <Input placeholder="Science and Technology" />
            </Label>
            <Label spanClassName="font-normal" name="Minimum Quantity">
              <Input type="number" placeholder="12" />
            </Label>
            <Label spanClassName="font-normal" name="Deadline to buy">
              <Input type="date" />
            </Label>
            <ButtonGroup>
              <Button variant={"primary"}>Add</Button>
              <Button type="reset" variant={"outline"}>Clear</Button>
            </ButtonGroup>
          </form>
        </section>
      );
}

export default AddBuyingItem