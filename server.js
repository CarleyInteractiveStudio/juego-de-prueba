const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.cea': 'application/json',
  '.ceanim': 'application/json',
  '.ceScene': 'application/json',
  '.ceSprite': 'application/json',
  '.celib': 'application/json',
  '.ico': 'image/x-icon'
};

function startServer(port) {
  const server = http.createServer((req, res) => {
    let filePath = '.' + decodeURIComponent(req.url.split('?')[0]);
    if (filePath === './') filePath = './index.html';

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('404 Not Found: ' + filePath);
        } else {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('Error interno: ' + error.code);
        }
      } else {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache'
        });
        res.end(content, 'utf-8');
      }
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Puerto ${port} ocupado. Probando con ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Error del servidor:', err);
    }
  });

  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log('==================================================');
    console.log(`🎮 ¡Servidor de juego iniciado con éxito!`);
    console.log(`🔗 Abre este enlace en tu navegador para jugar:`);
    console.log(`   👉 \x1b[36m${url}\x1b[0m`);
    console.log('==================================================');
    console.log('Presiona Ctrl+C para cerrar el servidor.');

    const start = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${start} ${url}`).catch(() => {});
  });
}

startServer(8000);