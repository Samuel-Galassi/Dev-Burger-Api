import Router from 'express';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import multer from 'multer';
import multerConfig from './config/multer.cjs';
import authMiddleware from './app/middlewares/auth.js';
import CategoryController from './app/controllers/CategoryController.js';
import adminMiddleware from './app/middlewares/admin.js';
import OrderController from './app/controllers/OrderController.js';
import CreatePaymentIntentController from './app/controllers/stripe/CreatePaymentIntentController.js';
const routes = new Router();

const upload = multer(multerConfig)

routes.post('/users', UserController.store);    //Cadastro
routes.post('/sessions', SessionController.store); //Login

routes.use(authMiddleware); //Será chamado por todas as rotas ABAIXO

routes.post('/products',
    adminMiddleware,
    upload.single('file'),
    ProductController.store
);

routes.put('/products/:id',
    adminMiddleware,
    upload.single('file'),
    ProductController.update
);    //PUT -> /products/5   

routes.get('/products', ProductController.index)

routes.post('/categories',
    adminMiddleware,
    upload.single('file'),
    CategoryController.store
);           //upload.single('file')-->é um middleware

routes.put('/categories/:id',
    adminMiddleware,
    upload.single('file'),
    CategoryController.update
);           //upload.single('file')-->é um middleware

routes.get('/categories', CategoryController.index)

routes.post('/orders',
    OrderController.store
); 

routes.get('/orders',
    OrderController.index
); 

routes.put('/orders/:id',
    adminMiddleware,
    OrderController.update
);    //PUT -> /products/5   

routes.post('/create-payment-intent', CreatePaymentIntentController.store);

export default routes;



//upload.single('file')-->é um middleware
//upload.single('file')-->é um middleware