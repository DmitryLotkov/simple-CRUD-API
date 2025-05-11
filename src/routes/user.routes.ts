import { IncomingMessage, ServerResponse } from 'http'
import {
  createUserController,
  getUsersController,
  getUserByIdController,
  deleteUserByIdController
} from '../controllers/user.controller'
import { sendJSON } from '../utils/response'

export const userRouter = (req: IncomingMessage, res: ServerResponse): boolean => {
  const { url, method } = req

  const host = req.headers.host ?? 'localhost'
  const parsedUrl = new URL(url as string, `https://${host}`)

  const pathname = parsedUrl.pathname
  const userId = pathname.match(/^\/users\/([a-z0-9-]+)$/)?.[1]
  const UUID_REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  if (userId && !UUID_REGEXP.test(userId)) {
    sendJSON(res, 400, { message: `Invalid user id format: ${userId}` })
    return true
  }

  if (pathname === '/users' && method === 'GET') {
    getUsersController(res)
    return true
  }

  if (pathname === '/users' && method === 'POST') {
    createUserController(req, res)
    return true
  }

  if (method === 'GET' && userId) {
    getUserByIdController(userId, res)
    return true
  }

  if (method === 'DELETE' && userId) {
    deleteUserByIdController(userId, res)
    return true
  }

  return false
}
