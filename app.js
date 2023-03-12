const express = require('express');
const Vite = require('vite');

const { NODE_ENV } = process.env;
const PROXY_PORT = 39482;

async function main() {

  const port = process.env.PORT || 3000;
  const app = express();

  app.get('/', (req, _res, next) => {
    req.url = '/__vue__';
    next('route');
  });

  // virtual route to forward to
  app.get('/__vue__', async (_req, res) => {
    if (NODE_ENV == 'dev') {
      const response = await fetch(`http://localhost:${PROXY_PORT}`);
      res.send(await response.text());
    } else {
      res.sendFile(__dirname + '/dist/index.html');
    }
  });

  const server = app.listen(port);

  if (NODE_ENV == 'dev') {
    const Proxy = require('http-proxy');

    var proxy = new Proxy.createProxyServer({
      target: { host: 'localhost', port: PROXY_PORT }
    });

    // proxy anything yet-unhandled back to vite
    app.get('*', (req, res) => proxy.web(req, res));

    // proxy hmr ws back to vite
    server.on('upgrade', (req, socket, head) => {
      if (req.url == '/') proxy.ws(req, socket, head)
    });

    // start our vite dev server
    const vite = await Vite.createServer({ server: { port: PROXY_PORT }});
    vite.listen();

  } else {
    // serve built static files
    app.use(express.static(__dirname + '/dist'));
  }

  console.log(`listening on port ${port}`);
}

main();
