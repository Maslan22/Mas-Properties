"use server";

import { GetCurrentUserFromMongoDB } from "./user";
import prisma from "@/config/db";
import { revalidatePath } from "next/cache";

export const AddProperty = async (property: any) => {
  try {
    const user: any = await GetCurrentUserFromMongoDB();
    property.userId = user.data.id;
    await prisma.property.create({
      data: property,
    });
    revalidatePath("/user/properties");
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

export const EditProperty = async (property: any, id: string) => {
  // Destructure the `id` and any other non-updatable fields out of the property object if present.
  const { id: propertyId, createdAt, updatedAt, user, ...updatableFields } = property;

  try {
    await prisma.property.update({
      where: {
        id: id,
      },
      data: updatableFields, // Use only updatable fields here
    });
    revalidatePath("/user/properties");
    return {
      data: property, // Return the original property object or consider returning the result of the update operation
      message: "Property updated successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
