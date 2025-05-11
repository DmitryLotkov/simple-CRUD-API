import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers } from '../services/user.service';
import { sendJSON } from '../utils/response';

export const getUsersController = (req: IncomingMessage, res: ServerResponse) => {
    const users = getAllUsers();
    sendJSON(res, 200, users);
};
