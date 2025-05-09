import React from "react";
import { Metadata } from "next";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UserTable from "@/components/tables/UserTable";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Users | DIKEY TECH.",
  description:
    "This is Users List for Admin Dashboard",
  // other metadata
};

const apiUrl = process.env.API_URL;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

async function getUsers() {
    const res = await fetch(new URL(apiUrl + '/users', baseUrl), {
        next: {
            revalidate: 60, // Revalidate every 1 minute (ISR / Incremental Static Regeneration)
        }
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return await res.json();
}

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <div>
            <PageBreadcrumb pageTitle="Users" />
            <div className="space-y-6">
                <ComponentCard title=''>
                    <UserTable users={users} />
                </ComponentCard>
            </div>
        </div>
    );
}
