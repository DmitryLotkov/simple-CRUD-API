import { IncomingMessage, ServerResponse } from 'http'
import { getAllUsers, addUser, filterUsers, updateUsers } from '../services/user.service'
import { sendJSON } from '../utils/sendJSON'
import { validateUser } from '../utils/validateUser'
import { v4 as uuidv4 } from 'uuid'
import { User, RawUser } from '../models/user'

export const getUsersController = (res: ServerResponse) => {
  sendJSON(res, 200, getAllUsers())
}

export const createUserController = (req: IncomingMessage, res: ServerResponse) => {
  let body = ''

  req.on('data', (chunk) => {
    body += chunk
  })

  req.on('end', () => {
    try {
      const data: RawUser = JSON.parse(body)

      validateUser(data, res)

      const newUser: User = {
        id: uuidv4(),
        hobbies: data.hobbies,
        age: data.age,
        username: data.username
      }

      addUser(newUser)
      sendJSON(res, 201, newUser)
    } catch (e) {
      sendJSON(res, 400, { message: 'Invalid data in request' })
    }
  })

  req.on('error', () => {
    sendJSON(res, 500, { message: 'Server error' })
  })
}

export const getUserByIdController = (userId: string, res: ServerResponse) => {
  const userById = getAllUsers().find((user) => user.id === userId)

  if (userById) {
    sendJSON(res, 200, userById)
  } else {
    sendJSON(res, 404, { message: `User with id "${userId}" not found` })
  }
}

export const deleteUserByIdController = (userId: string, res: ServerResponse) => {
  const userById = getAllUsers().find((user) => user.id === userId)

  if (userById) {
    filterUsers(userId)
    res.writeHead(204, { 'Content-Type': 'application/json' })
  } else {
    sendJSON(res, 404, { message: `User with id "${userId}" not found` })
  }
}

export const updateUserController = (userId: string, req: IncomingMessage, res: ServerResponse) => {
  const userById = getAllUsers().find((user) => user.id === userId)

  if (userById) {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      try {
        const newUser: RawUser = JSON.parse(body)

        validateUser(newUser, res)

        updateUsers(userId, newUser)

        sendJSON(res, 200, newUser)
      } catch (e) {
        sendJSON(res, 400, { message: 'Invalid data in request' })
      }
    })

    req.on('error', () => {
      sendJSON(res, 500, { message: 'Server error' })
    })
  } else {
    sendJSON(res, 404, { message: `User with id "${userId}" not found` })
  }
}
