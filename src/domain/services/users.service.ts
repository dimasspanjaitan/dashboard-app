import type { User } from "@/domain/models/users.model";
import type { Post} from "@/domain/models/posts.model";
import { fetchUsers } from "@/domain/models/users.model";
import { getPostsByUserId, getPosts } from "@/domain/services/posts.service";

export async function getUsers(): Promise<User[]> {
      const users = await fetchUsers();

      if (!users) {
            throw new Error('user not found');
      }

      try {
            const posts = await getPosts();

            return users.map((user: User) => {
                  const post = extractUserPosts(posts, user.id);
                  return {
                        ...user,
                        posts: post
                  }
            })
      } catch {
            return users
      }
}

export async function getUserById(id: number): Promise<User> {
      const users = await fetchUsers();

      if (!users) {
            throw new Error('empty users');
      }

      const user = filterUser(users, id);
      if (!user) {
            throw new Error('user not found');
      }

      const userPosts = await getPostsByUserId(user.id);
      if (userPosts) {
            user.posts = userPosts;
      }

      return user
}

function filterUser (users: User[], id: number): User | undefined {
      return users.find((user: User) => user.id == id);
}

function extractUserPosts(posts: Post[], userId: number): Post[] {
      return posts.filter((post: Post) => post.userId == userId);
}
