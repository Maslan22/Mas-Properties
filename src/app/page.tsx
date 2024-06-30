import { Button, Flex, Input } from 'antd';
import { UserButton, useUser } from '@clerk/nextjs';

export default function Home() {
  const loggedInUser = useUser() as any;
  console.log(loggedInUser);
  return (
    <div className="p-20 flex items-center justify-center flex-col gap-10 h-screen">
      <UserButton />
    </div>
  );
}