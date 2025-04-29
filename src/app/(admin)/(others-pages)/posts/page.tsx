import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Posts",
  description:
    "This is Posts  page Admin Dashboard",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Posts" />
      <div className="space-y-6">
        <ComponentCard title="Table 1">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
