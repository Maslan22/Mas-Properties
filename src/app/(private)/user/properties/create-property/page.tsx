import PageTitle from "@/componets/page-title";
import React from "react";
import PropertiesForm from "../_componets/properties-form";

function CreatePropertyPage() {
  return (
    <div>
      <PageTitle title="Create Property" />
      <PropertiesForm />
    </div>
  );
}

export default CreatePropertyPage;
