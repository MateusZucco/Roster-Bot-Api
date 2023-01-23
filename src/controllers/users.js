const USERS = require("../models/Users");
const BCRYPT = require("bcrypt");
// const env = require('../../.env')
const JWT = require("jsonwebtoken");
const DOTENV = require("dotenv");
DOTENV.config();

module.exports = {
  async create(req, res) {
    try {
      const SALT = await BCRYPT.genSalt(10);
      let data = { ...req.body };
      data.password = await BCRYPT.hash(req.body.password, SALT);
      const USER = await USERS.create(data);
      return res.status(201).json(USER);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.toString() });
    }
  },

  async login(req, res) {
    try {
      const USER = await USERS.findOne({
        where: { telegramId: req.params.telegramId },
      });
      if (USER) {
        const PASSWORD_VALID = await BCRYPT.compare(
          req.body.password,
          USER.password
        );
        if (PASSWORD_VALID) {
          const TOKEN = JWT.sign(
            {
              id: USER.id,
              email: USER.email,
              name: USER.name,
              telegramId: USER.telegramId,
            },
            process.env.JWT_SECRET
          );
          res.status(200).json({ token: TOKEN });
        } else {
          res.status(401).json({ error: "Senha incorreta" });
        }
      } else {
        res
          .status(200)
          .json({
            error:
              "Usuário não encontrado. Para cadastrar seu usuário basta acessar a aba de cadastro no site: http://localhost:8080",
          });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.toString() });
    }
  },

  async verifyRegister(req, res) {
    try {
      const USER = await USERS.findOne({
        where: { telegramId: req.params.telegramId },
      });
      if (USER) {
        res.status(200).json({ isRegistred: true });
      } else {
        res
          .status(200)
          .json({
            isRegistred: false,
            message:
              "Usuário não encontrado. Para cadastrar seu usuário basta acessar a aba de cadastro no site: http://localhost:8080",
          });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.toString() });
    }
  },
};
