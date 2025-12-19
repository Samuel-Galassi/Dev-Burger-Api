
# 🍔 DevBurger — API (Back-end)

![Status](https://img.shields.io/badge/status-em%20desenvolvido-green?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-AUTH-blue?style=for-the-badge)

Este repositório contém o **back-end da aplicação DevBurger**, desenvolvido em **Node.js**, seguindo padrões de **API REST**, autenticação segura e integração com banco de dados.

O projeto faz parte da minha formação como **Desenvolvedor Full Stack** no **DevClub**, simulando uma aplicação real de delivery com regras de negócio, autenticação e persistência de dados.

---

## 🛠️ LINK DO PROJETO FRONTEND
https://devburger-interface-two.vercel.app

---

## 🛠️ LINK DO PROJETO BACKEND
https://dev-burger-api-5b2n.onrender.com

---

## 🛠️ Tecnologias utilizadas

- Node.js  
- Express.js  
- PostgreSQL  
- Sequelize ORM  
- JWT (Autenticação)  
- Yup (Validação de dados)  
- Multer (Upload de imagens)  
- Stripe (Pagamentos)  

---

## ⚙️ Funcionalidades da API

- Autenticação de usuários (JWT)
- Cadastro e login
- Controle de permissões (admin)
- CRUD de produtos
- Upload de imagens
- Listagem por categorias
- Criação e gerenciamento de pedidos
- Integração com gateway de pagamento (Stripe)

---

## 🧠 Diferenciais

- Arquitetura organizada em **controllers, models e middlewares**
- Validação robusta de dados
- Segurança com variáveis de ambiente (.env)
- Separação clara entre regras de negócio
- Estrutura escalável para crescimento do projeto

---

## 📂 Estrutura do projeto

```bash
📦 Dev-Burger-Api
 ┣ 📂 src
 ┃ ┣ 📂 controllers
 ┃ ┣ 📂 models
 ┃ ┣ 📂 middlewares
 ┃ ┣ 📂 config
 ┃ ┣ 📂 database
 ┃ ┗ 📜 server.js
 ┣ 📜 package.json
 ┣ 📜 README.md
