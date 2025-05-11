import 'dotenv/config'
import http from 'node:http';
import {User} from "./types";

const PORT = process.env.PORT || 5000;
const users: User[] = [
    {
        id: '1',
        name: 'Dims'
    }
];

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (url === '/users' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    }
})



server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});