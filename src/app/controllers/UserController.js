import { v4 } from 'uuid';
import * as yup from 'yup';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

//CRUD - Create, Read, Update, Delete
class UserController {
    //cria um novo usuário
    async store(req, res) {
        const schema = yup.object({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().min(6).max(20).required(),
            admin: yup.boolean()
        })

        //trata os erros de validação
        try {
            schema.validateSync(req.body, { abortEarly: false, strict: true });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }


        const { name, email, password, admin } = req.body;

        const existingUser = await User.findOne({
            where: {
                email
            }
        })
        if (existingUser) {
            return res.status(409).json({ message: 'E-mail already taken!' });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            id: v4(),
            name,
            email,
            password_hash,
            admin
        });
        return res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin

        });
    }
}


export default new UserController();