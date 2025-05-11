import { User } from '../models/user'

let users: User[] = []

export const getAllUsers = (): User[] => users

export const addUser = (user: User) => {
  users = [...users, user]
}

export const filterUsers = (userId: string) => {
  users = users.filter((user) => user.id !== userId)
}
