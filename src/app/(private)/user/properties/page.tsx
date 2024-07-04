import PageTitle from "@/componets/page-title";
import React, { Suspense } from "react";
import PropertiesTable from "./_componets/properties-table";
import LinkButton from "@/componets/link-button";
import Filters from "@/componets/filters";
import Loader from "@/componets/loader";

function Properties() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Properties" />
        <LinkButton
          title="Create Property"
          path="/user/properties/create-property"
        />
      </div>
      <Filters />
      <Suspense fallback={<Loader />}>
        <PropertiesTable />
      </Suspense>
    </div>
  );
}

export default Properties;
