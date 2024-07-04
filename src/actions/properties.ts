"use server";

import { GetCurrentUserFromMongoDB } from "./user";
import prisma from "@/config/db";

export const AddProperty = async (property: any) => {
  try {
    const user: any = await GetCurrentUserFromMongoDB();
    property.user = user.data;
    await prisma.property.create({
      data: property,
    });
    return {
      data: property,
      message: "Property added successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
