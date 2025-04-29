'use client';

import React, { useState, useMemo } from "react";
import Link from "next/link";
import SearchBar from '@/components/common/SearchBar'
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
};

export default  function UserTable({ users }: { users: User[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<keyof User>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (key: keyof User) => {
        if (sortBy === key) {
          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
          setSortBy(key);
          setSortDirection('asc');
        }
    };

    const filteredAndSortedUsers = useMemo(() => {
        const filtered = users.filter((user) => {
            const target = `${user.name} ${user.username} ${user.email} ${user.phone} ${user.website} ${user.company.name}`.toLowerCase();
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
    }, [users, searchTerm, sortBy, sortDirection]);

    const renderSortArrow = (key: keyof User) => sortBy === key ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : '';

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
                                Name{renderSortArrow('name')}
                                </TableCell>
                                <TableCell
                                isHeader
                                onClick={() => handleSort('username')}
                                className="cursor-pointer"
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                Username{renderSortArrow('username')}
                                </TableCell>
                                <TableCell
                                isHeader
                                onClick={() => handleSort('email')}
                                className="cursor-pointer"
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                Email{renderSortArrow('email')}
                                </TableCell>
                                <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                Address
                                </TableCell>
                                <TableCell
                                isHeader
                                onClick={() => handleSort('phone')}
                                className="cursor-pointer"
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                Phone{renderSortArrow('phone')}
                                </TableCell>
                                <TableCell
                                isHeader
                                onClick={() => handleSort('website')}
                                className="cursor-pointer"
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                Website{renderSortArrow('website')}
                                </TableCell>
                                <TableCell
                                isHeader
                                onClick={() => handleSort('company')}
                                className="cursor-pointer"
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                Company{renderSortArrow('company')}
                                </TableCell>
                            </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {filteredAndSortedUsers.map((user: User) => (
                                <TableRow key={user.id}>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Link href={`/users/${user.id}`} className="text-blue-600 hover:underline">
                                            {user.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {user.username}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {user.email}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {user.address.street}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {user.phone}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {user.website}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {user.company.name}
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>        
    );
}
