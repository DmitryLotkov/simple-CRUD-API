import { RawUser } from '../models/user'

export const validateUser = (data: RawUser): void => {
  if (typeof data.username !== 'string' || data.username.trim().length === 0) {
    throw new Error('Invalid username: must be a non-empty string')
  }

  if (typeof data.age !== 'number' || !Number.isInteger(data.age) || data.age < 0) {
    throw new Error('Invalid age: must be a non-negative integer')
  }

  if (
    !Array.isArray(data.hobbies) ||
    !data.hobbies.every((hobby) => typeof hobby === 'string' && hobby.trim().length > 0)
  ) {
    throw new Error('Invalid hobbies: must be a non-empty array of non-empty strings')
  }
}
