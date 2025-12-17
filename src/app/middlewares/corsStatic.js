


export default function corsStatic(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', process.env.URL_VERCEL);
  next();
}



