"use client";
import React, { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Button, Dropdown, message } from "antd";
import { GetCurrentUserFromMongoDB } from "@/actions/user";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/componets/loader";

const userMenu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Properties",
    path: "/user/properties",
  },
  {
    name: "Account",
    path: "/user/account",
  },
  {
    name: "Subscriptions",
    path: "/user/subscriptions",
  },
];
const adminMenu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Properties",
    path: "/admin/properties",
  },
  {
    name: "Users",
    path: "/admin/users",
  },
];

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [menuToShow, setMenuToShow] = useState<any>(userMenu);
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);
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
            <Dropdown
              menu={{
                items: menuToShow.map((item: any) => ({
                  label: item.name,
                  onClick: () => {
                    router.push(item.path);
                  },
                })),
              }}
            >
              <Button className="text-primary hover:text-primary" type="link">
                {currentUserData?.username.trim() &&
                currentUserData.username.trim().toLowerCase() !== "null"
                  ? currentUserData.username.trim()
                  : currentUserData?.email}
              </Button>
            </Dropdown>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </div>
    );
  };

  const getContent = () => {
    if (isPublicRoute) return children;
    if (loading) return (
      <div className="flex justify-center items-start h-screen pt-20">
        <Loader />
      </div>
    );
    return <div className="py-5 lg:px-20 px-5">{children}</div>;
  };

  const getCurrentUser = async () => {
    setLoading(true);
    try {
      const response: any = await GetCurrentUserFromMongoDB();
      if (response.error) throw new Error(response.error.message);
      setCurrentUserData(response.data);
      console.log(response.data);
      if (response.data.isAdmin) {
        setMenuToShow(adminMenu);
      }
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
