import { RawUser, User } from '../models/user'
import { sendJSON } from './sendJSON'
import { ServerResponse } from 'http'

export const validateUser = (user: RawUser, res: ServerResponse) => {
  const { username, age, hobbies } = user
  if (
    typeof username !== 'string' ||
    typeof age !== 'number' ||
    !Array.isArray(hobbies) ||
    !hobbies.every((hobby) => typeof hobby === 'string')
  ) {
    sendJSON(res, 400, {
      message: 'Invalid user data format'
    })
    return
  }
}
