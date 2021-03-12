const mysql = require('mysql2');
const myPort = 3306;
const db = mysql.createPool({
    connectionLimit: 100,
    host: 'splitwise-database1.ciyuzmcv7xt0.us-west-1.rds.amazonaws.com',
    user: 'admin',
    port: myPort,
    password: 'adminaws',
    database: 'SplitWise'
});

db.getConnection((err) => {
    if(err){
      throw 'Error occured: ' + err;
    }
  });
  
module.exports = db;