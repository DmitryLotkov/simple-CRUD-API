import http from 'node:http'
import { userRouter } from './routes/user.routes'
import { sendJSON } from './utils/response'

export const createServer = () =>
  http.createServer((req, res) => {
    if (!req.url || !req.method) {
      sendJSON(res, 400, { message: 'Bad Request: Missing url or method' })
      return
    }

    try {
      if (userRouter(req, res)) {
        return
      }

      sendJSON(res, 400, { message: 'Route not found' })
    } catch (err) {
      console.error('Internal server error:', err)
      sendJSON(res, 500, { message: 'Internal Server Error' })
    }
  })
