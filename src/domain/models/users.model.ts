import type { Post } from '@/domain/models/posts.model'

export type User = {
    id: number
    name: string
    username: string
    email: string
    address: Address
    phone: string
    website: string
    company: Company
    posts: Post[]
}
  
export type Address = {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: Geo
}
  
export type Geo = {
    lat: string
    lng: string
}
  
export type Company = {
    name: string
    catchPhrase: string
    bs: string
}
  
const BACKEND_URL: string = process.env.BACKEND_URL ?? 'http://localhost:3000'
const USERS_URL: URL = new URL('/users', BACKEND_URL)
  
export async function fetchUsers(): Promise<User[] | null> {
    try {
        const res = await fetch(new URL(USERS_URL));;
        const users = await res.json();
        return users as User[];
    } catch (error) {
        throw new Error('failed to fetch users');
    }
}
  