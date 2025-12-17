const { resolve } = require('node:path');
const express = require('express');

const uploadPath = resolve(__dirname, '..', '..', 'uploads');

const router = express.Router();

// Middleware CORS para todas as rotas
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.URL_VERCEL);
  next();
});

// Servir arquivos estáticos com cabeçalho específico para CORB
router.use('/product-file', express.static(uploadPath, {
  setHeaders: (res, path, stat) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); 
  }
}));

module.exports = router;