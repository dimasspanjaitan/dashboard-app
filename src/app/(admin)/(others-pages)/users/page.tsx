import React from "react";
import { Metadata } from "next";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UserTable from "@/components/tables/UserTable";

console.log(UserTable);

export const metadata: Metadata = {
  title: "Users",
  description:
    "This is Users List for Admin Dashboard",
  // other metadata
};

const apiUrl = process.env.API_URL;

async function getUsers() {
    const res = await fetch(apiUrl + '/users', {
        next: {
            revalidate: 60, // Revalidate every 1 minute (ISR / Incremental Static Regeneration)
        }
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
}

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <div>
            <PageBreadcrumb pageTitle="Users" />
            <div className="space-y-6">
                <ComponentCard>
                    <UserTable users={users} />
                </ComponentCard>
            </div>
        </div>
    );
}
