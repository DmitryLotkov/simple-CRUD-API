import { User, RawUser } from '../models/user'

let users: User[] = []

export const getAllUsers = (): User[] => users

export const addUser = (user: User) => {
  users = [...users, user]
}

export const filterUsers = (userId: string) => {
  users = users.filter((user) => user.id !== userId)
}

export const updateUsers = (userId: string, newUser: RawUser) => {
  users = users.map((user) =>
    user.id === userId
      ? {
          id: user.id,
          ...newUser
        }
      : { ...user }
  )
}
