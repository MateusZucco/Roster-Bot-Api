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

## Routes

## Authentication
