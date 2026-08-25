// Simulador de Vercel: sirve la RAIZ del repo y aplica los rewrites de vercel.json.
// Uso: node scripts/serve-like-vercel.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..'); // raiz del repo
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8', '.json': 'application/json',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.ico': 'image/x-icon',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};

// Traduce un "source" de vercel.json (path-to-regexp) a RegExp de forma fiel:
// escapa los literales y solo deja sin escapar los grupos "(...)" y ":param".
function toRegex(source) {
  let out = '';
  let i = 0;
  while (i < source.length) {
    const ch = source[i];
    if (ch === '(') {                       // grupo: copiar balanceado
      let depth = 0;
      let j = i;
      while (j < source.length) {
        if (source[j] === '(') depth++;
        else if (source[j] === ')') { depth--; if (depth === 0) { j++; break; } }
        j++;
      }
      out += source.slice(i, j);
      i = j;
      continue;
    }
    if (ch === ':' && /\w/.test(source[i + 1] || '')) { // :param
      let j = i + 1;
      while (j < source.length && /\w/.test(source[j])) j++;
      out += '([^/]+)';
      i = j;
      continue;
    }
    out += ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    i++;
  }
  return new RegExp('^' + out + '$');
}

const routes = cfg.rewrites.map(r => ({ re: toRegex(r.source), dest: r.destination }));

function applyRewrite(urlPath) {
  for (const r of routes) {
    const m = urlPath.match(r.re);
    if (m) return r.dest.replace(/\$(\d)/g, (_, i) => m[i] || '');
  }
  return null;
}

function isFile(p) {
  try { return fs.statSync(p).isFile(); } catch { return false; }
}

// Vercel sirve primero el archivo real y solo entonces aplica rewrites.
// Un directorio no cuenta como acierto: "/" debe poder reescribirse.
function resolve(urlPath) {
  if (isFile(path.join(ROOT, urlPath))) return urlPath;
  return applyRewrite(urlPath);
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const target = resolve(urlPath);
  const file = target ? path.join(ROOT, target) : null;

  if (!file || !file.startsWith(ROOT)) {
    res.writeHead(404, { 'content-type': 'text/plain' });
    return res.end('404 NOT_FOUND');
  }

  fs.stat(file, (err, st) => {
    if (err) {
      res.writeHead(404, { 'content-type': 'text/plain' });
      return res.end('404 NOT_FOUND');
    }
    const p = st.isDirectory() ? path.join(file, 'index.html') : file;
    fs.readFile(p, (e, buf) => {
      if (e) {
        res.writeHead(404, { 'content-type': 'text/plain' });
        return res.end('404 NOT_FOUND');
      }
      res.writeHead(200, { 'content-type': MIME[path.extname(p).toLowerCase()] || 'application/octet-stream' });
      res.end(buf);
    });
  });
});

server.listen(4173, '0.0.0.0', () => console.log('simulador Vercel en http://0.0.0.0:4173'));
