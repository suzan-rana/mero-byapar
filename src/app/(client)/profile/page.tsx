'use client';
import Card, { CardTitle, CardText, RevealPassword } from "@/components/Card";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { useAuthContext } from "@/context/hooks";
import Link from "next/link";
import React from "react";
import EditProfile from "./EditProfile";
import ResetPassword from "./ResetPassword";

type Props = {};

const ProfilePage = (props: Props) => {
  const { isFetching, isLoading, user } = useAuthContext();
  return (
    <div>
      <Card isLoading={isFetching || isLoading || !user}>
        {user && (
          <>
            <div className="flex items-start sm:items-center justify-between">
              <CardTitle title={user?.name} />
              <CardText
                text={user.role.role_name}
                className="bg-green-300 inline-block px-2   rounded-md text-gray-800 lowercase"
              ></CardText>
            </div>
            <CardText text={user.email}></CardText>
            <CardText text={user.contact_number}></CardText>
          </>
        )}
      </Card>
      <EditProfile />
      <ResetPassword />
    </div>
  );
};

export default ProfilePage;
