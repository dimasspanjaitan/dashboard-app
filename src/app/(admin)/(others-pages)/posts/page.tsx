import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PostTable from "@/components/tables/PostTable";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Posts",
    description:
      "This is Posts List for Admin Dashboard",
    // other metadata
};

const apiUrl = process.env.API_URL;

async function getPosts() {
    const res = await fetch(apiUrl + '/posts', {
        cache: 'no-store',
        next: {
            revalidate: 60, // Revalidate every 1 minute (ISR / Incremental Static Regeneration)
        }
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
}

async function getUsers() {
    const res = await fetch(apiUrl + '/users', {
        next: {
            revalidate: 60, // Revalidate every 1 minute (ISR / Incremental Static Regeneration)
        }
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
}

export default async function PostsPage() {
    const posts = await getPosts();
    const users = await getUsers();
    posts.map((p) => {
        p.user = users.find(x => x.id == p.userId)
        return p;
    })
          
    return (
        <div>
            <PageBreadcrumb pageTitle="Posts" />
            <div className="space-y-6">
                <ComponentCard title="Table 1">
                    <PostTable posts={posts} />
                </ComponentCard>
            </div>
        </div>
    );
}
