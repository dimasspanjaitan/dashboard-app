'use client';

import React, { useState, useMemo } from "react";
import Link from "next/link";
import SearchBar from '@/components/common/SearchBar'
import Pagination from "@/components/common/Pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export default  function PostTable({ posts }: { posts: Post[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<keyof Post>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(1);
    const postsPerPage = 10;

    const handleSort = (key: keyof Post) => {
        if (sortBy === key) {
          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
          setSortBy(key);
          setSortDirection('asc');
        }
    };

    const filteredAndSortedPosts = useMemo(() => {
        const filtered = posts.filter((post) => {
            const target = `${post.user?.name} ${post.title}`.toLowerCase();
            return target.includes(searchTerm.toLowerCase());
        });
    
        return filtered.sort((a, b) => {
          let aVal = a[sortBy];
          let bVal = b[sortBy];
    
          if (typeof aVal === 'object' && aVal !== null) {
            aVal = 'name' in aVal ? aVal.name : '';
          }
          if (typeof bVal === 'object' && bVal !== null) {
            bVal = 'name' in bVal ? bVal.name : '';
          }
    
          const aStr = String(aVal).toLowerCase();
          const bStr = String(bVal).toLowerCase();
    
          return sortDirection === 'asc'
            ? aStr.localeCompare(bStr)
            : bStr.localeCompare(aStr);
        });
    }, [posts, searchTerm, sortBy, sortDirection]);

    const renderSortArrow = (key: keyof Post) => sortBy === key ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : '';

    const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
    const currentPosts = filteredAndSortedPosts.slice(
        (page - 1) * postsPerPage,
        page * postsPerPage
    );
    // console.log(currentPosts);

    return (
        <div className="space-y-6">
            <div className="relative">
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                        <Table>
                            {/* Table Header */}
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell
                                    isHeader
                                    onClick={() => handleSort('name')}
                                    className="cursor-pointer"
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                    ID
                                </TableCell>
                                <TableCell
                                    isHeader
                                    onClick={() => handleSort('name')}
                                    className="cursor-pointer"
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                    Creator{renderSortArrow('name')}
                                </TableCell>
                                <TableCell
                                    isHeader
                                    onClick={() => handleSort('title')}
                                    className="cursor-pointer"
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                    Title{renderSortArrow('title')}
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
                            {currentPosts.map((post: Post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {post.id}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Link href={`/users/${post.userId}`} className="text-blue-600 hover:underline">
                                            {post.user?.name}
                                        </Link>
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
            <div>
                <Pagination 
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
  }