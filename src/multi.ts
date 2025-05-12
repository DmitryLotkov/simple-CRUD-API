import 'dotenv/config'
import cluster from 'node:cluster'
import os from 'node:os'
import http from 'node:http'
import { createServer } from './server'

const PORT = Number(process.env.PORT) || 4000
const numWorkers = os.availableParallelism() - 1
const workerPorts = Array.from({ length: numWorkers }).map((_, i) => PORT + 1 + i)

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`)

  workerPorts.forEach((port) => {
    cluster.fork({ WORKER_PORT: port })
  })

  let current = 0

  http
    .createServer((req, res) => {
      const targetPort = workerPorts[current]
      current = (current + 1) % workerPorts.length

      const proxy = http.request(
        {
          hostname: 'localhost',
          port: targetPort,
          path: req.url,
          method: req.method,
          headers: req.headers
        },
        (proxyRes) => {
          res.writeHead(proxyRes.statusCode || 500, proxyRes.headers)
          proxyRes.pipe(res, { end: true })
        }
      )

      req.pipe(proxy, { end: true })

      proxy.on('error', (err) => {
        console.error(`Proxy error: ${err.message}`)
        res.writeHead(502)
        res.end('Bad Gateway')
      })
    })
    .listen(PORT, () => {
      console.log(`Load balancer listening on http://localhost:${PORT}`)
    })
} else {
  const port = Number(process.env.WORKER_PORT)
  createServer().listen(port, () => {
    console.log(`Worker ${process.pid} listening on http://localhost:${port}`)
  })
}
