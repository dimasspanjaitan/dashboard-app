import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const metadata: Metadata = {
  title: "Posts",
  description:
    "This is Posts List for Admin Dashboard",
  // other metadata
};

const apiUrl = process.env.API_URL;
async function getPosts() {
    const res = await fetch(apiUrl + '/posts');
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
}

async function getUsers() {
  const res = await fetch(apiUrl + '/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export default async function PostsPage() {
    const posts = await getPosts();
    const users = await getUsers();
    posts.map((p) => {
      // console.log(users);
      p.user = users.find(x => x.id == p.userId)
      return p;
    })

    console.log(posts[0]);

    
  return (
    <div>
      <PageBreadcrumb pageTitle="Posts" />
      <div className="space-y-6">
        <ComponentCard title="Table 1">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                            Creator
                            </TableCell>
                            <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                            Title
                            </TableCell>
                            <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                            Content
                            </TableCell>
                        </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {posts.map((post: Post) => (
                            <TableRow key={post.id}>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {post.user?.name}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {post.title}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {post.body}
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </div>
                </div>
            </div>
        </ComponentCard>
      </div>
    </div>
  );
}
