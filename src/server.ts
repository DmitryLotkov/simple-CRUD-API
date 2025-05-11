import http from 'node:http';
import { userRouter } from './routes/user.routes';

export const createServer = () =>
    http.createServer((req, res) => {
        try {
            if (userRouter(req, res)) {
                return;
            }

            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Route not found' }));
        } catch (err) {
            console.error('Internal server error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
        }
    });
