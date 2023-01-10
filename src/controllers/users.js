const Users = require("../models/Users");
const bcrypt = require("bcrypt");
// const env = require('../../.env')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    async create(req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            let data = { ...req.body }
            data.password = await bcrypt.hash(req.body.password, salt)
            let user = await Users.create(data)
            return res.status(201).json(user);
        } catch (err) {
            console.log(err)
            return res.status(400).json({error: err});
        }
    },

    async login(req, res) {
        try {
            const user = await Users.findOne({ where: { telegramId: req.params.telegramId } });
            if (user) {
                const password_valid = await bcrypt.compare(req.body.password, user.password);
                if (password_valid) {
                    token = jwt.sign({ "id": user.id, "email": user.email, "name": user.name, telegramId: user.telegramId }, process.env.JWT_SECRET);
                    res.status(200).json({ token: token });
                } else {
                    res.status(401).json({ error: "Senha incorreta" });
                }
            } else {
                res.status(200).json({ error: "Usuário não encontrado. Para cadastrar seu usuário basta acessar a aba de cadastro no site: http://localhost:8080" });
            }
        } catch (err) {
            console.log(err)
            return res.status(400).json({error:err});
        }
    },
    
    async verifyRegister (req, res) {
        try {
            const user = await Users.findOne({ where: { telegramId: req.params.telegramId } });
            if (user) {
                res.status(200).json({ isRegistred: true})
            } else {
                res.status(200).json({ isRegistred: false, message: "Usuário não encontrado. Para cadastrar seu usuário basta acessar a aba de cadastro no site: http://localhost:8080" });
            }
        } catch (err) {
            console.log(err)
            return res.status(400).json({error:err});
        }
    },
}