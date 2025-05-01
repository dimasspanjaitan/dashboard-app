import { User } from '@/domain/models/users.model';

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface PostwithUser extends Post {
    user: User;
}

const BACKEND_URL: string = process.env.BACKEND_URL ?? 'http://localhost:8000'
const POSTS_URL: URL = new URL('/posts', BACKEND_URL)
  
export async function fetchPosts() {
    const res = await fetch(new URL(POSTS_URL));;
    const posts = await res.json();
    return posts;
}