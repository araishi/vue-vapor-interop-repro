// Renders src/App.vue on the server and hydrates it in the browser (Vite dev server in middleware mode)
import { readFile } from 'node:fs/promises'
import { createServer as createHttpServer } from 'node:http'
import { createServer as createViteServer } from 'vite'

const port = Number(process.env.PORT || 5173)
const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'custom' })

createHttpServer((req, res) => {
  vite.middlewares(req, res, async () => {
    try {
      const template = await vite.transformIndexHtml(req.url, await readFile('index.html', 'utf8'))
      const { render } = await vite.ssrLoadModule('/src/entry-server.js')
      const html = template.replace('<!--app-html-->', await render())
      res.writeHead(200, { 'content-type': 'text/html' }).end(html)
    } catch (error) {
      vite.ssrFixStacktrace(error)
      console.error(error)
      res.writeHead(500).end(String(error.stack))
    }
  })
}).listen(port, () => console.log(`http://localhost:${port}`))
