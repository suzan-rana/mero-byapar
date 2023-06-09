import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Link from "next/link";
import React from "react";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    
    <section className="ml-auto  min-h-[50vh] sm:w-[80%] sm:mx-auto">
      {" "}
      <h1 className="text-2xl text-green-700 capitalize  font-bold mt-4 mb-12 text-center">
        MeroByapar Login
      </h1>{" "}
      <form className="flex flex-col gap-5">
        <Label name="Username">
          <Input name="username" placeholder="suzan-rana" />
        </Label>
        <Label name="Password">
          <Input name="password" placeholder="********" />
        </Label>
        <ButtonGroup>
          {" "}
          <Button type="button" variant={"primary"}>
            <Link  href={'/'} className="w-[100%] block h-[100%]" >Login</Link>
          </Button>
          <Button type="button" variant={"outline"}>
            Register
          </Button>
        </ButtonGroup>
      </form>
    </section>
  );
};

export default LoginPage;
