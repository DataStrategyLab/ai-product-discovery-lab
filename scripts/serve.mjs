import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HOST = process.env.HOST ?? '127.0.0.1';
const PORT = Number(process.env.PORT ?? 4173);

const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.md', 'text/markdown; charset=utf-8']
]);

function resolveRequest(urlPath) {
  const pathname = decodeURIComponent(new URL(urlPath, `http://${HOST}:${PORT}`).pathname);
  const relative = pathname === '/' ? 'src/index.html' : pathname.replace(/^\/+/, '');
  const candidate = path.resolve(ROOT, relative);
  if (!candidate.startsWith(ROOT + path.sep) && candidate !== ROOT) return null;
  return candidate;
}

const server = http.createServer(async (req, res) => {
  try {
    const filePath = resolveRequest(req.url ?? '/');
    if (!filePath) throw Object.assign(new Error('Forbidden'), { statusCode: 403 });
    const info = await stat(filePath);
    if (!info.isFile()) throw Object.assign(new Error('Not found'), { statusCode: 404 });
    const body = await readFile(filePath);
    res.writeHead(200, { 'content-type': contentTypes.get(path.extname(filePath)) ?? 'application/octet-stream' });
    res.end(body);
  } catch (error) {
    const statusCode = error?.code === 'ENOENT' ? 404 : (error?.statusCode ?? 500);
    res.writeHead(statusCode, { 'content-type': 'text/plain; charset=utf-8' });
    res.end(statusCode === 404 ? 'Not found' : error.message);
  }
});

server.on('error', (error) => {
  if (error?.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use on ${HOST}. Retry with e.g. PORT=${PORT + 1} npm start`);
    process.exitCode = 1;
    return;
  }
  throw error;
});

server.listen(PORT, HOST, () => {
  console.log(`Cedarline starter running at http://${HOST}:${PORT}`);
  console.log('Synthetic fixtures only; no external side effects are configured.');
});
