import express from 'express';
import fileRouteConfig from './config/fileRoutes.cjs';
import routes from './routes.js';
import cors from 'cors';

const app = express();
app.use(cors({
    origin:'https://devburger-interface-two.vercel.app', //frontend
    method:['GET','POST','PUT','DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/product-file', fileRouteConfig);
app.use('/category-file', fileRouteConfig);

app.use(routes);

export default app;


