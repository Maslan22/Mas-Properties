"use server";
import prisma from "@/config/db";
import { currentUser } from "@clerk/nextjs/server";

export const GetCurrentUserFromMongoDB = async () => {
  try {
    //Check if the user is already exist  with clerk userID property
    const clerkUser = await currentUser();
    let mongoUser = null;
    mongoUser = await prisma.user.findUnique({
      where: {
        clerkUserId: clerkUser?.id,
      },
    });
    if (mongoUser) {
      return {
        data: mongoUser,
      };
    }

    // If the user is not exist in the database, create a new user

    let username = clerkUser?.username;
    if (!username) {
      username = clerkUser?.firstName + " " + clerkUser?.lastName;
    }

    username = username.replace("null", "");

    const newUser: any = {
      clerkUserId: clerkUser?.id,
      username: username,
      email: clerkUser?.emailAddresses[0].emailAddress,
      profilePic: clerkUser?.imageUrl,
    };
    const result = await prisma.user.create({
      data: newUser,
    });
    return {
      data: result,
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: error.message,
    };
  }
};
