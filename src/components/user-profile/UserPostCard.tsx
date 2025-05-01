"use client";
import React from "react";
import PostList from "@/components/posts/PostList"

import type { Post } from "@/domain/models/posts.model"

export default function UserAddressCard({ posts }: {posts: Post[]}) {
    return (
        <>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Posts
                        </h4>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Title
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Content
                                </p>
                            </div>
                        </div>
                        <div>
                            <PostList posts={posts} />
                        </div>
                      
                    </div>
                </div>
            </div>
        </>
    );
}
