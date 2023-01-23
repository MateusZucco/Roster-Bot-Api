# Roster Bot API

This is the back-end of the [Roster Bot](https://github.com/MateusZucco/Roster-Bot), my undergraduate thesis for [IFRS](https://ifrs.edu.br/) that I created a Telegram chatbot with the purpose of helping users when they need manage a roster.

 ## About this project
 
 In this repository you will find a REST API, built with [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/), [Sequelize](https://sequelize.org/) and [PostgreSQL](https://www.postgresql.org/), with the main objective of serving list and item management routes to the [Roster-Bot](https://github.com/MateusZucco/Roster-Bot), in addition to registering users through the [Roster-Bot-Website](https://github.com/MateusZucco/Roster-Bot-Website).
  
## Getting Started

### Prerequisites

To run this API in the development mode, you'll need to have a environment with NodeJS installed and you'll need to have a PostgreSQL database running on your machine at the port (15432).

### Environment variables example
Create a .env file to save yours environment variables, like this:

```
JWT_SECRET="my_hash",
DB_NAME="my_db_name",
DB_USER="my_db_username",
DB_PASSWORD="my_db_password",
DB_HOST="localhost",
DB_DIALECT="postgres",
DB_PORT="15432",
```

### Installing

**Cloning the Repository**

```
$ git clone https://github.com/MateusZucco/Roster-Bot-Api.git
$ cd roster-bot-api
```

**Installing dependencies**

```
$ npm install
```
**Running the database's migrations**

```
$ npx sequelize db:create
$ npx sequelize db:migrate
```

### Running the Development environment

With all dependencies installed, the Database running and the environment properly configured, you can now run the server:

```
$ npm run dev
```

## Models

The API has three main models: Rosters, RosterItems and Users. The Roster has a relation 1:N with RosterItems,the RosterItems has a realtion 1:1 to Rosters, the Users has a 0:N with Rosters and Rosters has a relation 1:1 with Users.

#### User

> *name*: User's name.
> *email*: User's email.
> *telegramId*: User's Telegram Chat Id.
> *phone*: User's phone.
> *password*: User's password.
```
{
id: {
     type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: true
 },
 telegramId: {
     type: DataTypes.INTEGER,
     allowNull: false,
     unique: true
 },
 name: {
     type: DataTypes.STRING,
     allowNull: false,
 },
 email: {
     type: DataTypes.STRING,
     allowNull: false,
     unique: true
 },
 password: {
     type: DataTypes.TEXT,
     allowNull: false,
 },
 phone: {
     type: DataTypes.STRING,
     allowNull: false,
 },
}

 static associate(models) {
   this.hasMany(models.rosters, { foreignKey: 'userId', as: 'rosters' })
 }
}
```

#### Rosters

> *userId*: User id.
> *title*: Roster's title.
> *description*: Roster's description.
> *itemsNumber*: Roster length.
```
{
 id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
 },
 userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
 },
 title: {
     type: DataTypes.STRING,
 },
 description: {
     type: DataTypes.STRING,
 },
 itemsNumber: {
     type: DataTypes.INTEGER,
     default: 0
 },
 createdAt: {
     type: DataTypes.DATE,
     defaultValue: new Date(),
     allowNull: false
 },
 updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false
 }

 static associate(models) {
     this.belongsTo(models.users, { foreignKey: 'userId', as: 'rosters' })
     this.hasMany(models.rostersItems, { foreignKey: 'rosterId', as: 'rosterItems' })
 }
}
```
#### RosterItems

> *rosterId*: Roster id.
> *text*: Item text.
> *icon*: Item icon.
> *position*: Item postiion.
```
{
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
  },
  rosterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'rosters', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
  },
  text: {
      type: DataTypes.STRING,
      allowNull: false
  },
  icon: {
      type: DataTypes.STRING,
  },
  position: {
      type: DataTypes.INTEGER,
      default: 0
  },
  createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false
  },
  updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false
  }

 static associate(models) {
      this.belongsTo(models.rosters, { foreignKey: 'rosterId', as: 'rosterItems' })
 }
}
```

## Routes

#### Users routes

```
ROUTES.post("/new-user", CONTROLLER.create); // create a new user
ROUTES.post("/:telegramId/login", CONTROLLER.login); // login in the Telegram Bot

ROUTES.get("/:telegramId/verify-register", CONTROLLER.verifyRegister); // verify if user is registered by Telegram Chat Id
```

#### Rosters routes

```
ROUTES.get('/list-rosters', verifyToken, Controller.list) // get all rosters

ROUTES.post('/roster',verifyToken, Controller.create) // create a new roster
ROUTES.post('/roster/:ROSTER_ID/new-item', verifyToken, Controller.newItens) // add a new item to roster

ROUTES.put('/roster/:ROSTER_ID/item/:ITEM_ID', verifyToken, Controller.editItem) // edit item
ROUTES.put('/roster/:ROSTER_ID/title', verifyToken, Controller.editTitle) // edit roster title
ROUTES.put('/roster/:ROSTER_ID/description', verifyToken, Controller.editDescription) // edit roster description
ROUTES.put('/roster/:ROSTER_ID/change-positions-items/:ITEM_ONE_ID/:ITEM_TWO_ID', verifyToken, Controller.changePositions) // change position of roster items

ROUTES.delete('/roster/:ROSTER_ID', verifyToken, Controller.delete) // delete a roster
ROUTES.delete('/roster/:ROSTER_ID/item/:ITEM_ID', verifyToken, Controller.deleteItem) // delete a roster item
```

## Authentication

All rosters routers has the "verifyToken" autentication, so when a route is called the header is verified. If the header contains the authenticated token, the request receives a new key containing the User.

```
if ("headers" in req && "token" in req.headers) {
    const TOKEN = req.headers["token"];
    JWT.verify(TOKEN, process.env.JWT_SECRET, async function (err, decode) {
      if (err) req.user = undefined;
      const USER_FINDED = await USER.findOne({ where: { id: decode.id } });
      req.user = USER_FINDED;
      next();
    });
  } else {
    req.user = undefined;
    res
      .status(401)
      .send({
        message:
          "Usuário não autorizado, reinicie o bot e faça login novamente",
      });
  }
```

