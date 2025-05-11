import { getAllUsers } from '../services/user.service'
import { User } from '../models/user'

export const findUserById = (id: string): User | undefined =>
  getAllUsers().find((user) => user.id === id)
