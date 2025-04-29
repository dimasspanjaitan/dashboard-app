'use client'

type Post = {
    userId: number
    id: number
    title: string
    body: string
}

export default function PostList({ posts }: { posts: Post[] }) {
    return (
        <div>
            {posts.map((post: Post) => (
                <div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                        <div>
                            <p className="text-sm font-bold text-gray-800 dark:text-white/90">{
                                post.title}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                {post.body}
                            </p>
                        </div>
                    </div>
                    <div>
                        <hr className="my-4 border-gray-200 dark:border-white/[0.1]" />
                    </div>
                </div>
            ))}
        </div>
    )
}
