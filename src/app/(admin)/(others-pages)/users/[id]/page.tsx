import UserPostCard from "@/components/user-profile/UserPostCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Detail User",
    description:
        "This is Detailed User Data",
};

type Params = { params: { id: string } };
const apiUrl = process.env.API_URL;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function generateStaticParams() {
    const res = await fetch(new URL(apiUrl + '/users', baseUrl));
    const users = await res.json();
    return users.map((user: any) => ({ id: String(user.id) }));
}

export default async function UserDetailPage({ params }: Params) {
    const { id } = params;
    const userRes = await fetch(new URL(apiUrl + `/users/${id}`, baseUrl));
    const user = await userRes.json();

    return (
        <div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Detailed User Data
                </h3>
                <div className="space-y-6">
                    <UserMetaCard user={user}/>
                    <UserInfoCard user={user}/>
                    <UserPostCard posts={user.posts||[]}/>
                </div>
            </div>
        </div>
    );
}
