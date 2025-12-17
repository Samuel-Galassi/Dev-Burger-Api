const { resolve } = require('node:path');
const express = require('express');

const uploadPath = resolve(__dirname, '..', '..', 'uploads');

const router = express.Router();

// Servir arquivos estáticos com CORS correto
router.use('/product-file', express.static(uploadPath, {
  setHeaders: (res, path, stat) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_VERCEL); // libera frontend
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); // essencial para imagens
  }
}));

module.exports = router;