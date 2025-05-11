import { IncomingMessage, ServerResponse } from 'http';
import { getUsersController } from '../controllers/user.controller';

export const userRouter = (req: IncomingMessage, res: ServerResponse): boolean => {
  const { url, method } = req;

  if (url === '/users' && method === 'GET') {
    getUsersController(req, res);
    return true;
  }

  if (url === '/users' && method === 'POST') {
    debugger;
  }

  return false;
};
