import PageTitle from "@/components/PageTitle";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Link from "next/link";
import React from "react";

type Props = {};

const CategoryPage = (props: Props) => {
  return (
    <main>
      <PageTitle>Add new Category</PageTitle>
      <form className="w-[50%] grid grid-cols-1  gap-y-8 my-8">
        <Label spanClassName="font-normal" name="Category Name">
          <Input placeholder="Science and Technology" />
        </Label>
        <Label spanClassName="font-normal" name="Category Code">
          <Input placeholder="UQ123" />
        </Label>
        <ButtonGroup>
          <Button variant={"primary"}>Create</Button>
          <Button variant={"outline"}>
            <Link className="w-full block h-full" href={"/products"}>
              Cancel
            </Link>
          </Button>
        </ButtonGroup>
      </form>
    </main>
  );
};

export default CategoryPage;
