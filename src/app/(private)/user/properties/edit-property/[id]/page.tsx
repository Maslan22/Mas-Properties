import PageTitle from "@/componets/page-title";
import React from "react";
import PropertiesForm from "../../_componets/properties-form";

function EditPropertyPage() {
  return (
    <div>
      <PageTitle title="Edit Property" />
      <PropertiesForm />
    </div>
  );
}

export default EditPropertyPage;
