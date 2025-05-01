import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PostTable from "@/components/tables/PostTable";
import { Metadata } from "next";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: "Posts | DIKEY TECH.",
    description:
      "This is Posts List for Admin Dashboard",
    // other metadata
};

const apiUrl = process.env.API_URL;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

async function getPosts() {
    const res = await fetch(new URL(apiUrl + '/posts', baseUrl), {
        next: {
            revalidate: 60, // Revalidate every 1 minute (ISR / Incremental Static Regeneration)
        }
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
}

export default async function PostsPage() {
    const posts = await getPosts();
          
    return (
        <div>
            <PageBreadcrumb pageTitle="Posts" />
            <div className="space-y-6">
                <ComponentCard title=''>
                    <PostTable posts={posts} />
                </ComponentCard>
            </div>
        </div>
    );
}
