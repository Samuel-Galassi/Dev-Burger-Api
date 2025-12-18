import * as yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';








class ProductController {
    //cria um novo produto
    async store(req, res) {
        const schema = yup.object({
            name: yup.string().required(),
            price: yup.number().required(),
            category_id: yup.number().required(),
            offer: yup.boolean()
        })
        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { name, price, category_id, offer } = req.body;
        const { filename } = req.file;

        const newProduct = await Product.create({
            name,
            price,
            category_id,
            path: `product-file/${filename}`,
            offer
        });

        

        return res.status(201).json(newProduct);
    }
    //atualiza/edita o produto
    async update(req, res) {
        const schema = yup.object({
            name: yup.string(),
            price: yup.number(),
            category_id: yup.number(),
            offer: yup.boolean()
        })
        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { name, price, category_id, offer } = req.body;
        const { id } = req.params

        let path
        if (req.file) {
            const { filename } = req.file;
            path = `product-file/${filename}`;
        }
        await Product.update({
            name,
            price,
            category_id,
            path,
            offer
        }, {
            where: {
                id
            }
        });


        return res.status(201).json();
    }
    //lista todos os produtos
    async index(req, res) {
        const products = await Product.findAll({
            include: {
                model: Category,
                as: 'category',
                attributes: ['id', 'name']
            },
        })

        return res.status(200).json(products);
    }
}




export default new ProductController();
