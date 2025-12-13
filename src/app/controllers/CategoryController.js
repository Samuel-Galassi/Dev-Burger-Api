import * as yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';








class CategoryController {
    //cria uma nova categoria
    async store(req, res) {
        const schema = yup.object({
            name: yup.string().required(),
        })
        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { name } = req.body;
        const { filename } = req.file

        const existingCategory = await Category.findOne({
            where: {
                name,
            },

            if(existingCategory) {
                return res.status(400).json({ message: 'Category already exists!' });
            }
        })

        const newCategory = await Category.create({
            name,
            path: filename
        });


        return res.status(201).json(newCategory);
    }
    //atualiza/edita a categoria

    async update(req, res) {
        const schema = yup.object({
            name: yup.string(),
        })
        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { name } = req.body;
        const { id } = req.params

        let path
        if (req.file) {
            const { filename } = req.file;
            path = filename
        }

        const existingCategory = await Category.findOne({
            where: {
                name,
            },

            if(existingCategory) {
                return res.status(400).json({ message: 'Category already exists!' });
            }
        })

        await Category.update({
            name,
            path,
        }, {
            where: {
                id
            }
        });


        return res.status(201).json();
    }
    //lista todas as categorias
    async index(req, res) {
        const categories = await Category.findAll()

        return res.status(200).json(categories);
    }
}




export default new CategoryController();
