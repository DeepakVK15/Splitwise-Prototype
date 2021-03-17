const mysql = require("mysql2");
const myPort = 3306;
const db = mysql.createPool({
  connectionLimit: 500,
  host: "splitwise-database1.ciyuzmcv7xt0.us-west-1.rds.amazonaws.com",
  user: "admin",
  port: myPort,
  password: "adminaws",
  database: "SplitWise",
});

const connection = mysql.createConnection({
  host: "splitwise-database1.ciyuzmcv7xt0.us-west-1.rds.amazonaws.com",
  user: "admin",
  port: myPort,
  password: "adminaws",
  database: "SplitWise",
});

db.getConnection((err) => {
  if (err) {
    throw "Error occured: " + err;
  }
});

module.exports = db;
module.exports = connection;