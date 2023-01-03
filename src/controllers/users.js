const Users = require("../models/Users");

module.exports = {
    async create(req, res) {
        try {
            let user = await Users.create({ ...req.body })
            return res.status(200).json(user);
        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }
    }
}