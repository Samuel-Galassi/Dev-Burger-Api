import * as yup from 'yup';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from './../../config/auth.js';

class SessionController {
    //cria uma nova sessão (login), retornando um token JWT e valida as informações do usuário
    async store(req, res) {
        const schema = yup.object({
            email: yup.string().email().required(),
            password: yup.string().min(6).max(20).required()
        })
        const isValid = await schema.isValid(req.body, {
            abortEarly: false,
            strict: true
        });
        //cria uma função para retornar o erro de email ou senha incorretos
        const emailOrPassworIncorrect = () => {
            return res
                .status(400)
                .json({ error: 'Email or password incorrect' });
        }

        if (!isValid) {
            emailOrPassworIncorrect();
        }
        const { email, password } = req.body;

        const existingUser = await User.findOne({
            where: {
                email
            }
        })
        if (!existingUser) {
            emailOrPassworIncorrect();
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password_hash
        );

        if (!isPasswordCorrect) {
            emailOrPassworIncorrect();
        }

        const token = jwt.sign(
            {
                id: existingUser.id,
                admin: existingUser.admin,
                name: existingUser.name,
            }, authConfig.secret,
            {
                expiresIn: authConfig.expiresIn
            });

        return res.status(200).json({
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            admin: existingUser.admin,
            token,
        })

    }
}



export default new SessionController();