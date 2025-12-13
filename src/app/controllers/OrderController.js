import * as yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Order from '../schemas/Order.js';


class OrderController {
    //cria um novo produto
    async store(req, res) {
        const schema = yup.object({
            products: yup.array()
                .required()
                .of(
                    yup.object({
                        id: yup.number().required(),
                        quantity: yup.number().required(),
                    }),
                ),
        });

        try {
            schema.validateSync(req.body, { abortEarly: false, strict: true });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { userId, userName } = req
        const { products } = req.body

        const prodctsIds = products.map(product => product.id)

        const findedProducts = await Product.findAll({
            where: {
                id: prodctsIds
            },
            include: {
                model: Category,
                as: 'category',
                attributes: ['name']
            }
        })

        const mapedProducts = findedProducts.map(product => {
            const quantity = products.find(p => p.id === product.id).quantity
            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                url: product.url,
                category: product.category.name,
                quantity,
            }

            return newProduct
        })

        const order = {
            user: {
                id: userId,
                name: userName,
            },
            products: mapedProducts,
            status: 'Pedido realizado',
        }

        const newOrder = await Order.create(order);

        return res.status(201).json(newOrder);
    }

    async update(req, res) {
        const schema = yup.object({
            status: yup.string()
                .required()
        })
        try {
            schema.validateSync(req.body, { abortEarly: false, strict: true });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const status = req.body.status;
        const { id } = req.params;

        try {
            await Order.updateOne({ _id: id }, { status });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(200).json({ message: "status updated sucessfully" });
    }

    async index(req, res) {
        const orders = await Order.find()

        return res.status(200).json(orders);
    }
}


export default new OrderController();


//CTRL + K + C comenta um bloco de código
//CTRL + K + U descomenta um bloco de código