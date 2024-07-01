"use client";
import React, { use, useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { message } from "antd";
import { GetCurrentUserFromMongoDB } from "@/actions/user";
import { User } from "@prisma/client";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [currentUserData = null, setCurrentUserData] = useState<User | null>(
    null
  );
  const getHeader = () => {
    return (
      <div className="lg:px-20 px-5">
        <div className="bg-primary p-2 flex justify-between items-center rounded-b">
          <h1 className="text-xl text-white font-bold">MAS Properties</h1>

          <div className="bg-white py-2 px-5 rounded-sm">
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </div>
    );
  };
  const getContent = () => {
    return <div className="py-5 lg:px-20 px-5">{children}</div>;
  };

  const getCurrentUser = async () => {
    try {
      const response: any = await GetCurrentUserFromMongoDB();
      if (response.error) throw new Error(response.error.message);
      setCurrentUserData(response.data);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div>
      {getHeader()}
      {getContent()}
    </div>
  );
}

export default LayoutProvider;
