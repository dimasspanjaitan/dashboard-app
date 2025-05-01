export type UserSignin = {
      username: string,
      password: string
}

const users: UserSignin[] = [{
      username: "testuser",
      password: "testpass"
}]

export function findUser(username: string) {
      return users.find((user: UserSignin) => user.username === username);
}

export function validateUserPassword(password: string, user: UserSignin) {
      return user.password === password;
}
