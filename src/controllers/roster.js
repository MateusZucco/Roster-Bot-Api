// const Users = require("../models/Users");
const Rosters = require("../models/Rosters");
const RosterItems = require("../models/RosterItems");
// const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    async list(req, res) {
        try {
            const rosters = await Rosters.findAll({
                where: { userId: req.user.id },
                include: {
                    model: RosterItems,
                    as: "rosterItems",
                },
                order: [
                    [
                        { model: RosterItems, as: 'rosterItems' },
                        'position',
                        'ASC',
                    ],
                ],
            })
            return res.status(201).json(rosters);
        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }
    },

    async create(req, res) {
        let rosterData = req.body.roster
        let itensData = req.body.itens
        try {
            let roster = await Rosters.create({ ...rosterData, userId: req.user.id })

            itensData = itensData.text
            itensData = itensData.replace(/; /g, ";");
            itensData = itensData.replace(/ ;/g, ";");
            itensData = itensData.replace(/ ; /g, ";");
            let itensArray = itensData.split(";");

            let position = 0
            await Promise.all(itensArray.map(async (item) => {
                position = itensArray.findIndex(i => i == item)
                await RosterItems.create({ text: item, icon: null, position: position + 1, rosterId: roster.dataValues.id })
            }))

            await Rosters.update({ itemsNumber: position + 1 }, { where: { id: roster.id, userId: req.user.id } })

            let updatedRoster = await Rosters.findOne({
                where: { id: roster.id, userId: req.user.id },
                include: {
                    model: RosterItems,
                    as: "rosterItems",
                },
                order: [
                    [
                        { model: RosterItems, as: 'rosterItems' },
                        'position',
                        'ASC',
                    ],
                ],
            })

            return res.status(200).json(updatedRoster);

        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }

    },

    async newItens(req, res) {
        // sete; oito; novo; dez; onze
        let newItens = req.body
        let { rosterId } = req.params
        try {
            let roster = await Rosters.findOne({ where: { id: rosterId, userId: req.user.id }, raw: true })

            newItens = newItens.text
            newItens = newItens.replace(/; /g, ";");
            newItens = newItens.replace(/ ;/g, ";");
            newItens = newItens.replace(/ ; /g, ";");
            let itensArray = newItens.split(";");
            let position = 0
            await Promise.all(itensArray.map(async (item) => {
                position = itensArray.findIndex(i => i == item)
                await RosterItems.create({ text: item, icon: null, position: position + 1 + roster.itemsNumber, rosterId: rosterId })
            }))

            await Rosters.update({ itemsNumber: position + 1 + roster.itemsNumber }, { where: { id: rosterId, userId: req.user.id } })
            let updatedRoster = await Rosters.findAll({
                where: { id: rosterId, userId: req.user.id },
                include: {
                    model: RosterItems,
                    as: "rosterItems",
                },
                order: [
                    [
                        { model: RosterItems, as: 'rosterItems' },
                        'position',
                        'ASC',
                    ],
                ],
            })
            return res.status(200).json(updatedRoster);
        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }
    },

    async editItem(req, res) {
        let { newValue } = req.body
        let { rosterId, itemId } = req.params
        try {
            await RosterItems.update({ text: newValue }, { where: { id: itemId, rosterId: rosterId } })
            let updatedRoster = await Rosters.findAll({
                where: { id: rosterId, userId: req.user.id },
                include: {
                    model: RosterItems,
                    as: "rosterItems",
                },
                order: [
                    [
                        { model: RosterItems, as: 'rosterItems' },
                        'position',
                        'ASC',
                    ],
                ],
            })
            return res.status(200).json(updatedRoster);
        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }
    },

    async editTitle(req, res) {
        let { newTitle } = req.body
        let { rosterId } = req.params
        try {
            await Rosters.update({ title: newTitle }, { where: { id: rosterId, userId: req.user.id } })
            let updatedRoster = await Rosters.findAll({
                where: { id: rosterId, userId: req.user.id },
                include: {
                    model: RosterItems,
                    as: "rosterItems",
                },
                order: [
                    [
                        { model: RosterItems, as: 'rosterItems' },
                        'position',
                        'ASC',
                    ],
                ],
            })
            return res.status(200).json(updatedRoster);
        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }
    },

    async editDescription(req, res) {
        let { newDescription } = req.body
        let { rosterId } = req.params
        try {
            await Rosters.update({ description: newDescription }, { where: { id: rosterId, userId: req.user.id } })
            let updatedRoster = await Rosters.findAll({
                where: { id: rosterId, userId: req.user.id },
                include: {
                    model: RosterItems,
                    as: "rosterItems",
                },
                order: [
                    [
                        { model: RosterItems, as: 'rosterItems' },
                        'position',
                        'ASC',
                    ],
                ],
            })
            return res.status(200).json(updatedRoster);
        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }
    },

    async changePositions(req, res) {
        const { rosterId, idItemOne, idItemTwo } = req.params

        try {
            let itemOne = await RosterItems.findOne({
                where: { rosterId: rosterId, id: idItemOne }
            })
            let itemTwo = await RosterItems.findOne({
                where: { rosterId: rosterId, id: idItemTwo }
            })
            await RosterItems.update({ position: itemTwo.position }, {
                where: { rosterId: rosterId, id: idItemOne }
            })
            await RosterItems.update({ position: itemOne.position }, {
                where: { rosterId: rosterId, id: idItemTwo }
            })
            let updatedRoster = await Rosters.findAll({
                where: { id: rosterId, userId: req.user.id },
                include: {
                    model: RosterItems,
                    as: "rosterItems",
                },
                order: [
                    [
                        { model: RosterItems, as: 'rosterItems' },
                        'position',
                        'ASC',
                    ],
                ],
            })
            return res.status(200).json(updatedRoster);
        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }
    },

    async deleteItem(req, res) {
        let { rosterId, itemId } = req.params
        try {
            let selectedItem = await RosterItems.findOne({ where: { id: itemId, rosterId: rosterId } })
            await RosterItems.destroy({ where: { id: itemId, rosterId: rosterId } })
            let updatedRoster = await Rosters.findOne({
                where: { id: rosterId, userId: req.user.id },
                include: {
                    model: RosterItems,
                    as: "rosterItems",
                },
            })

            updatedRoster.rosterItems.map(async (item) => {
                if (item.position > selectedItem.position) {
                    await RosterItems.update({ position: item.position - 1 }, { where: { id: item.id, rosterId: rosterId } })
                }
            })
            await Rosters.update({ itemsNumber: updatedRoster.itemsNumber - 1 }, {
                where: { id: rosterId, userId: req.user.id },
            })
            updatedRoster = await Rosters.findAll({
                where: { id: rosterId, userId: req.user.id },
                include: {
                    model: RosterItems,
                    as: "rosterItems",
                },
                order: [
                    [
                        { model: RosterItems, as: 'rosterItems' },
                        'position',
                        'ASC',
                    ],
                ],
            })
            return res.status(200).json(updatedRoster);
        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }
    },

    async delete(req, res) {
        let { rosterId } = req.params
        try {
            await Rosters.destroy({ where: { id: rosterId, userId: req.user.id } })
            return res.status(200).json();
        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }
    },
}