import { IncomingMessage, ServerResponse } from 'http'
import { getAllUsers, addUser } from '../services/user.service'
import { sendJSON } from '../utils/response'
import { validateCreateUser } from '../utils/validateCreateUser'
import { v4 as uuidv4 } from 'uuid'
import { User } from '../models/user'

export const getUsersController = (req: IncomingMessage, res: ServerResponse) => {
  const users = getAllUsers()
  sendJSON(res, 200, users)
}

export const createUserController = (req: IncomingMessage, res: ServerResponse) => {
  let body = ''

  req.on('data', (chunk) => {
    body += chunk
  })

  req.on('end', () => {
    try {
      const data: User = JSON.parse(body)

      validateCreateUser(data, res)

      const newUser: User = {
        id: uuidv4(),
        hobbies: data.hobbies,
        age: data.age,
        username: data.username
      }

      addUser(newUser)
      sendJSON(res, 201, newUser)
    } catch (e) {
      sendJSON(res, 400, { message: 'Invalid JSON' })
    }
  })

  req.on('error', () => {
    sendJSON(res, 500, { message: 'Server error' })
  })
}
