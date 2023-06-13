"use client";
import useFetchUserByUserId from "@/common/data-fetching-hooks/users/useFetchUserByUserId";
import Card, { CardText, CardTitle, RevealPassword } from "@/components/Card";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

type Props = {};

const UserPage = (props: Props) => {
  const { userId } = useParams();
  const { data, isFetching, isLoading } = useFetchUserByUserId(userId);
  if (!data) {
    return <></>;
  }
  const handleCopyData = async () => {
    await navigator.clipboard.writeText(JSON.stringify(data)).then((res) => {
      toast.success("User details copied to clipboard!");
    });
  };
  return (
    <div>
      <Card isLoading={isFetching || isLoading}>
        <div className="flex items-start sm:items-center justify-between">
          {" "}
          <CardTitle title={data?.name} />
          <CardText
            text={data.role.role_name}
            className="bg-green-300 inline-block px-2   rounded-md text-gray-800 lowercase"
          ></CardText>
        </div>
        <CardText text={data.email}></CardText>
        <CardText text={data.contact_number}></CardText>
        <RevealPassword
          password={data.password}
          className="break-all"
        ></RevealPassword>
        <ButtonGroup className="flex-row w-[100%]  mt-6 gap-6 ">
          <Button variant={"outline"} className="grow">
            <Link href={"/team"} className="w-full h-full block">
              Back
            </Link>
          </Button>
          <Button onClick={handleCopyData} variant={"primary"} className="grow">
            Copy!
          </Button>
        </ButtonGroup>
      </Card>
    </div>
  );
};

export default UserPage;
