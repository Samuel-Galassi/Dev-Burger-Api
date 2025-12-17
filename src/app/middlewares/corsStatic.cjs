

function corsStatic(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', process.env.URL_VERCEL);
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); // Essencial para imagens
  next();
}

module.exports = corsStatic;



