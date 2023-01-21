const JWT = require("jsonwebtoken");
const USER = require("../models/Users");

const verifyToken = async (req, res, next) => {
    if (("headers" in req) && ("token" in req.headers)) {
        const TOKEN = req.headers['token']
        JWT.verify(TOKEN, process.env.JWT_SECRET, async function (err, decode) {
            if (err) req.user = undefined;
            const USER_FINDED = await USER.findOne({ where: { id: decode.id } })
            req.user = USER_FINDED
            next();
        });
    } else {
        req.user = undefined;
        res.status(401).send({ message: "Usuário não autorizado, reinicie o bot e faça login novamente" });
    }
};
module.exports = verifyToken;