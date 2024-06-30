"use client";
import { Button, Flex, Input } from "antd";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  let username = user?.username;
  if (!username) {
    username = user?.firstName + " " + user?.lastName;
  }

  username = username.replace("null", "");
  return (
    <div className="flex items-center justify-center flex-col gap-10 h-screen">
      <UserButton afterSignOutUrl="/sign-in" signInUrl="/sign-in"/>
      <h1>Clerk user id: {user?.id}</h1>
      <h1>Username: {username}</h1>
      <h1>Email: {user?.emailAddresses[0].emailAddress}</h1>
    </div>
  );
}
