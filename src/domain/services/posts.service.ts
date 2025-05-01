import { fetchPosts } from "@/domain/models/posts.model";
import type { Post } from "@/domain/models/posts.model";
import { fetchUsers } from "@/domain/models/users.model";
import type { User } from "@/domain/models/users.model";

export async function getPosts(): Promise<Post[]> {
      const posts = await fetchPosts();

      if (!posts) {
            throw new Error('empty posts');
      }

      return posts
}

export async function getPostsByUserId(userid: number): Promise<Post[]> {
      try {
            const posts = await getPosts();

            return posts.filter((post: Post) => post.userId === userid)
      } catch {
            return []
      }
}

export async function getPostswithUser(): Promise<Post[]> {
      const posts = await fetchPosts();

      if (!posts) {
            throw new Error('empty posts');
      }

      try {
            const users = await fetchUsers();

            if (!users) {
                  throw new Error('empty users');
            }

            return posts.map((post: Post) => {
                  const user = filterUser(users, post.userId);
                  return {
                        ...post,
                        user: user
                  }
            })
      } catch {
            return posts
      }
}

function filterUser (users: User[], id: number): User | undefined {
      return users.find((user: User) => user.id == id);
}
