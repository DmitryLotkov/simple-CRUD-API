import { ServerResponse } from 'http';

export const sendJSON = (res: ServerResponse, statusCode: number, data: unknown) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};