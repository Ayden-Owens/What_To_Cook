const mysql = require('mysql2');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const pool = mysql.createPool({
    host: 's554ongw9quh1xjs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'cviqm8lnbslxjltk',
    password: 'mqdzp35gb6vnbj2p',
    database: 'egkyikk14s0zbsl5',
    waitForConnections: true,
    connectionLimit: 10, // Adjust based on your needs
    queueLimit: 0
});

const sessionStore = new MySQLStore({
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
    },
    expiration: 86400000, // 1 day in milliseconds
    clearExpired: true,
    checkExpirationInterval: 900000, // 15 minutes
    connectionLimit: 10,
    columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data'
    }

}, pool);

module.exports =  sessionStore;
