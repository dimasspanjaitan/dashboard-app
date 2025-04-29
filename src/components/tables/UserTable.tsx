'use client';

import React, { useState, useMemo } from "react";
import Link from "next/link";
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
                <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
                    <svg
                        className="fill-gray-500 dark:fill-gray-400"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                        fill=""
                        />
                    </svg>
                </span>
                <input
                    type="text"
                    placeholder="Search by name, email or username"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                />
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
