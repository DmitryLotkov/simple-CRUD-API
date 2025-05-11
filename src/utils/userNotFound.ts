import { sendJSON } from './sendJSON'
import { ServerResponse } from 'http'

export const userNotFound = (res: ServerResponse, id: string) =>
  sendJSON(res, 404, { message: `User with ${id} not found` })
