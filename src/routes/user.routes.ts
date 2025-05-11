import { IncomingMessage, ServerResponse } from 'http'
import {
  createUserController,
  getUsersController,
  getUserByIdController
} from '../controllers/user.controller'

export const userRouter = (req: IncomingMessage, res: ServerResponse): boolean => {
  const { url, method } = req

  const host = req.headers.host ?? 'localhost'
  const parsedUrl = new URL(url as string, `https://${host}`)

  const pathname = parsedUrl.pathname
  const userId = pathname.match(/^\/users\/([a-z0-9-]+)$/)?.[1]

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

  return false
}
