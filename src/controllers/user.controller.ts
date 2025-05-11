import { IncomingMessage, ServerResponse } from 'http'
import { getAllUsers, addUser, filterUsers, updateUsers } from '../services/user.service'
import { sendJSON } from '../utils/sendJSON'
import { validateUser } from '../utils/validateUser'
import { v4 as uuidv4 } from 'uuid'
import { User, RawUser } from '../models/user'
import { getRequestBody } from '../utils/parseBody'
import { findUserById } from '../utils/findUserById'
import { userNotFound } from '../utils/userNotFound'

export const getUsersController = (res: ServerResponse) => {
  sendJSON(res, 200, getAllUsers())
}

export const createUserController = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await getRequestBody(req)
    let data: RawUser
    try {
      data = JSON.parse(body)
    } catch {
      sendJSON(res, 400, { message: 'Invalid JSON format' })
      return
    }

    validateUser(data)

    const newUser: User = {
      id: uuidv4(),
      hobbies: data.hobbies,
      age: data.age,
      username: data.username
    }

    addUser(newUser)
    sendJSON(res, 201, newUser)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Server error'
    const status = message.startsWith('Invalid') ? 400 : 500
    sendJSON(res, status, { message })
  }
}

export const getUserByIdController = (userId: string, res: ServerResponse) => {
  const userById = findUserById(userId)

  if (userById) {
    sendJSON(res, 200, userById)
  } else {
    userNotFound(res, userId)
  }
}

export const deleteUserByIdController = (userId: string, res: ServerResponse) => {
  const userById = findUserById(userId)

  if (userById) {
    filterUsers(userId)
    res.writeHead(204)
    res.end()
  } else {
    userNotFound(res, userId)
  }
}

export const updateUserController = async (
  userId: string,
  req: IncomingMessage,
  res: ServerResponse
) => {
  const userById = findUserById(userId)

  if (!userById) {
    userNotFound(res, userId)
    return
  }

  try {
    const body = await getRequestBody(req)

    let newUser: RawUser
    try {
      newUser = JSON.parse(body)
    } catch {
      sendJSON(res, 400, { message: 'Invalid JSON format' })
      return
    }

    validateUser(newUser)
    updateUsers(userId, newUser)
    sendJSON(res, 200, newUser)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Server error'
    const status = message.startsWith('Invalid') ? 400 : 500
    sendJSON(res, status, { message })
  }
}
