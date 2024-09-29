import jsonServer from "json-server"
import path from "path"
import { fileURLToPath } from "url"
import { createServer } from "http"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = jsonServer.create()

const router = jsonServer.router(path.resolve(__dirname, "db.json"))

server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)

server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800)
  })
  next()
})

server.use(router)

// запуск сервера
const HTTP_PORT = 8000

const httpServer = createServer(server)

httpServer.listen(HTTP_PORT, () => {
  console.log(`server is running on ${HTTP_PORT} port`)
})
