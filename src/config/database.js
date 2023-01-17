const dotenv = require('dotenv');
dotenv.config();
module.exports= {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    dialect: 'postgres',
    port: '15432',
    define: {
        timestamps: true
    },
}