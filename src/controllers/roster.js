const ROSTER = require("../models/Rosters");
const ROSTER_ITEM = require("../models/RosterItems");
// const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

function splitNewItems(items) {
  let itensData;
  itensData = items.text;
  itensData = itensData.replace(/; /g, ";");
  itensData = itensData.replace(/ ;/g, ";");
  itensData = itensData.replace(/ ; /g, ";");
  return itensData.split(";");
}

async function newRosterItems(
  rosterItemsArray,
  rosterData,
  userId,
  position = 0
) {
  await Promise.all(
    rosterItemsArray.map(async (item) => {
      position = rosterItemsArray.findIndex((i) => i == item);
      await ROSTER_ITEM.create({
        text: item,
        icon: null,
        position: rosterData.itemsNumber  + position + 1,
        rosterId: rosterData.id,
      });
    })
  );
  await ROSTER.update(
    { itemsNumber: position + 1 + rosterData.itemsNumber },
    { where: { id: rosterData.id, userId: userId } }
  );
}

async function getUpdatedRoster(rosterId, userId) {
  try {
    const UPDATED_ROSTER = await ROSTER.findOne({
      where: { id: rosterId, userId: userId },
      include: {
        model: ROSTER_ITEM,
        as: "rosterItems",
      },
      order: [[{ model: ROSTER_ITEM, as: "rosterItems" }, "position", "ASC"]],
    });
    return UPDATED_ROSTER;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  async list(req, res) {
    try {
      const { id: USER_ID } = req.user;

      const ROSTERS = await ROSTER.findAll({
        where: { userId: USER_ID },
        include: {
          model: ROSTER_ITEM,
          as: "rosterItems",
        },
        order: [[{ model: ROSTER_ITEM, as: "rosterItems" }, "position", "ASC"]],
      });
      return res.status(201).json(ROSTERS);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.toString() });
    }
  },

  async create(req, res) {
    try {
      const REQUEST_DATA = req.body.roster;
      const { id: USER_ID } = req.user;

      const ROSTER_DATA = await ROSTER.create({
        ...REQUEST_DATA,
        userId: USER_ID,
      });

      let itensArray = splitNewItems(req.body.itens);

      await newRosterItems(itensArray, ROSTER_DATA, USER_ID);

      const UPDATED_ROSTER = await getUpdatedRoster(ROSTER_DATA.id, USER_ID);

      console.log(UPDATED_ROSTER);
      return res.status(200).json(UPDATED_ROSTER);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.toString() });
    }
  },

  async newItens(req, res) {
    try {
      const { ROSTER_ID } = req.params;
      const { id: USER_ID } = req.user;

      const ROSTER_DATA = await ROSTER.findOne({
        where: { id: ROSTER_ID, userId: USER_ID },
        raw: true,
      });

      let itensArray = splitNewItems(req.body);

      await newRosterItems(itensArray, ROSTER_DATA, USER_ID);

      const UPDATED_ROSTER = await getUpdatedRoster(ROSTER_ID, USER_ID);

      return res.status(201).json(UPDATED_ROSTER);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.toString() });
    }
  },

  async editItem(req, res) {
    try {
      const { id: USER_ID } = req.user;
      const { newValue: NEW_VALUE } = req.body;
      const { ROSTER_ID, ITEM_ID } = req.params;

      await ROSTER_ITEM.update(
        { text: NEW_VALUE },
        { where: { id: ITEM_ID, rosterId: ROSTER_ID } }
      );

      const UPDATED_ROSTER = await getUpdatedRoster(ROSTER_ID, USER_ID);

      return res.status(200).json(UPDATED_ROSTER);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.toString() });
    }
  },

  async editTitle(req, res) {
    try {
      const { id: USER_ID } = req.user;
      const { newTitle: NEW_TITLE } = req.body;
      const { ROSTER_ID } = req.params;

      await ROSTER.update(
        { title: NEW_TITLE },
        { where: { id: ROSTER_ID, userId: USER_ID } }
      );

      const UPDATED_ROSTER = await getUpdatedRoster(ROSTER_ID, USER_ID);

      return res.status(200).json(UPDATED_ROSTER);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.toString() });
    }
  },

  async editDescription(req, res) {
    try {
      const { id: USER_ID } = req.user;
      const { newDescription: NEW_DESCRIPTION } = req.body;
      const { ROSTER_ID } = req.params;

      await ROSTER.update(
        { description: NEW_DESCRIPTION },
        { where: { id: ROSTER_ID, userId: USER_ID } }
      );

      const UPDATED_ROSTER = await getUpdatedRoster(ROSTER_ID, USER_ID);

      return res.status(200).json(UPDATED_ROSTER);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.toString() });
    }
  },

  async changePositions(req, res) {
    try {
      const { ROSTER_ID, ITEM_TWO_ID, ITEM_ONE_ID } = req.params;
      const { id: USER_ID } = req.user;

      const ITEM_ONE = await ROSTER_ITEM.findOne({
        where: { rosterId: ROSTER_ID, id: ITEM_ONE_ID },
      });
      const ITEM_TWO = await ROSTER_ITEM.findOne({
        where: { rosterId: ROSTER_ID, id: ITEM_TWO_ID },
      });

      await ROSTER_ITEM.update(
        { position: ITEM_TWO.position },
        {
          where: { rosterId: ROSTER_ID, id: ITEM_ONE_ID },
        }
      );
      await ROSTER_ITEM.update(
        { position: ITEM_ONE.position },
        {
          where: { rosterId: ROSTER_ID, id: ITEM_TWO_ID },
        }
      );

      const UPDATED_ROSTER = await getUpdatedRoster(ROSTER_ID, USER_ID);

      return res.status(200).json(UPDATED_ROSTER);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.toString() });
    }
  },

  async deleteItem(req, res) {
    try {
      const { ROSTER_ID, ITEM_ID } = req.params;
      const { id: USER_ID } = req.user;

      const ITEM_TO_DESTROY = await ROSTER_ITEM.findOne({
        where: { id: ITEM_ID, rosterId: ROSTER_ID },
      });

      await ROSTER_ITEM.destroy({
        where: { id: ITEM_ID, rosterId: ROSTER_ID },
      });

      let rosterToRemoveItem = await getUpdatedRoster(ROSTER_ID, USER_ID);

      rosterToRemoveItem.rosterItems.map(async (item) => {
        if (item.position > ITEM_TO_DESTROY.position) {
          await ROSTER_ITEM.update(
            { position: item.position - 1 },
            { where: { id: item.id, rosterId: ROSTER_ID } }
          );
        }
      });

      await ROSTER.update(
        { itemsNumber: rosterToRemoveItem.itemsNumber - 1 },
        {
          where: { id: ROSTER_ID, userId: USER_ID },
        }
      );

      const UPDATED_ROSTER = await getUpdatedRoster(ROSTER_ID, USER_ID);

      return res.status(200).json(UPDATED_ROSTER);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.toString() });
    }
  },

  async delete(req, res) {
    try {
      const { ROSTER_ID } = req.params;
      const { id: USER_ID } = req.user;

      await ROSTER.destroy({ where: { id: ROSTER_ID, userId: USER_ID } });

      return res.status(200).json();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.toString() });
    }
  },
};
