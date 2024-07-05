import PageTitle from "@/componets/page-title";
import React from "react";
import PropertiesForm from "../_componets/properties-form";
import prisma from "@/config/db";
import { Property } from "@prisma/client";

async function CreatePropertyPage({ searchParams }: { searchParams: any }) {
  const cloneFrom = searchParams?.cloneFrom || "";
  let property: Property | null = null;
  if (cloneFrom) {
    property = (await prisma.property.findUnique({
      where: {
        id: cloneFrom,
      },
    })) as Property;
  }
  return (
    <div>
      <PageTitle title="Create Property" />
      <PropertiesForm initialValues={property ? property : {}} />
    </div>
  );
}

export default CreatePropertyPage;
