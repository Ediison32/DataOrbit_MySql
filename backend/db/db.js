

// import

require('dotenv').config();

const mysql = require('mysql2');
let db;

// creao una variable con la configuracion basica para su conexion 
try {
    
    db = mysql.createConnection({
        host:process.env.host,
        user:process.env.user,
        password: process.env.PASSWORD,
        database: process.env.database
    });
    console.log("running ");
    
}catch(err){
    console.error("error in conexion db", err);
    db = null;
}

module.exports = db;
// creao una conexion 
