"use client";
import React, { use, useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { message } from "antd";
import { GetCurrentUserFromMongoDB } from "@/actions/user";
import { User } from "@prisma/client";
import { usePathname } from "next/navigation";
import Loader from "@/componets/loader";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [currentUserData = null, setCurrentUserData] = useState<User | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const isPublicRoute = ["/sign-in", "/sign-up"].includes(pathname);
  const getHeader = () => {
    if (isPublicRoute) return null;
    return (
      <div className="lg:px-20 px-5">
        <div className="bg-primary p-2 flex justify-between items-center rounded-b">
          <h1 className="text-2xl text-white font-bold">MAS Properties</h1>

          <div className="bg-white py-2 px-5 rounded-sm flex items-center gap-5">
            <span>{currentUserData?.username}</span>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </div>
    );
  };
  const getContent = () => {
    if (isPublicRoute) return children;
    // if (loading) return <Loader />;
    return (
        <div>
          <div className="py-5 lg:px-20 px-5">{children}</div>
          {loading && <Loader />}
        </div>
      );
  };

  const getCurrentUser = async () => {
    setLoading(true);
    try {
      const response: any = await GetCurrentUserFromMongoDB();
      if (response.error) throw new Error(response.error.message);
      setCurrentUserData(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPublicRoute) getCurrentUser();
  }, []);

  return (
    <div>
      {getHeader()}
      {getContent()}
    </div>
  );
}

export default LayoutProvider;
