"use strict";
var express = require("express");
var session = require("express-session");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passwordHash = require("password-hash");
const mysql = require("mysql2");
const {
  cmysqlHost,
  mysqlUser,
  mysqlPassword,
  mysqlDatabase,
} = require("./utils/config");
const { json } = require("body-parser");
const { response } = require("express");
const { beginTransaction } = require("./utils/connection");

// const { frontendURI } = require("./utils/config");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use cors to allow cross origin resource sharing
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

const db = mysql.createConnection({
  user: "admin",
  host: "splitwise-database1.ciyuzmcv7xt0.us-west-1.rds.amazonaws.com",
  password: "adminaws",
  database: "SplitWise",
  // user: mysqlHost,
  // host: mysqlUser,
  // password: mysqlPassword,
  // database: mysqlDatabase
});

//Allow Access Control
app.use(function (req, res, next) {
  //   res.setHeader("Access-Control-Allow-Origin", frontendURI);
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

app.post("/signup", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = passwordHash.generate(req.body.password);

  db.query("SELECT * from users where email= ?", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length === 0) {
      db.query(
        "insert into users (name, email, password) VALUES (?,?,?)",
        [name, email, password],
        (err, result2) => {
          if (err) {
            console.log(err);
          } else {
            res.send({ message: "sign up success" });
          }
        }
      );
    } else {
      res.send({ message: "Account with email id already exists." });
    }
  });
});

app.post("/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * from users where email= ?", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (
      result.length > 0 &&
      passwordHash.verify(password, result[0].password)
    ) {
      res.cookie("cookie", email, {
        maxAge: 900000,
        httpOnly: false,
        path: "/",
      });
      req.session.user = result[0];
      res.send({ message: "login success" });
    } else {
      res.send({ message: "Incorrect username or password." });
    }
  });
});

app.post("/creategroup", function (req, res) {
  const groupname = req.body.groupname;
  const friends = req.body.friends;
  const image = req.body.image;
  const email = req.body.email;
  db.query(
    "select * from usersingroup where groupname = ?",
    [groupname],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        res.send({ message: "Group with the same name already exists." });
      } else {
        db.query(
          "insert into SplitWise.usersingroup(email,groupname) VALUES (?,?)",
          [email, groupname]
        );
        for (var i = 0; i < friends.length; i++) {
          let friend = friends[i].email;
          db.query(
            "select * from users where email = ?",
            [friend],
            (err, result3) => {
              if (err) {
                console.log(err);
              }
              if (result3.length === 1 && friend !== email) {
                db.query(
                  "insert into invite (invite_by, invite_to, groupname) VALUES (?,?,?)",
                  [email, friend, groupname],
                  (err, result2) => {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
              }
            }
          );
        }
        res.send({ message: "inserted users" });
      }
    }
  );
});

app.get("/invites", function (req, res) {
  const data = req.query;
  console.log("Invite by", data.invite_to);

  db.query(
    "select invite.invite_by,invite.invite_to,invite.groupname, users.name from SplitWise.invite inner join  SplitWise.users on users.email = invite.invite_by where invite_to=?",
    [data.invite_to],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Result", result);
        res.send(result);
      }
    }
  );
});

app.get("/mygroups", function (req, res) {
  const data = req.query;

  db.query(
    "select groupname from usersingroup where email = ?",
    [data.email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log("result of mygroups", Object.values(result));
        const result2 = [];
        for (var i = 0; i < result.length; i++) {
          result2.push(result[i].groupname);
        }
        // console.log(result2);

        res.send(result2);
      }
    }
  );
});

app.get("/lender", function (req, res) {
  const data = req.query;
  db.query(
    "select transaction.lenderid, transaction.borrowerid,transaction.groupid,transaction.amount,transaction.date, users.name as borrowername from SplitWise.transaction inner join SplitWise.users on transaction.borrowerid = users.email and transaction.lenderid = ?",
    [data.email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/borrower", function (req, res) {
  const data = req.query;
  db.query(
    "select transaction.lenderid, transaction.borrowerid,transaction.groupid,transaction.amount,transaction.date, users.name as lendername from SplitWise.transaction inner join SplitWise.users on transaction.lenderid = users.email and transaction.borrowerid = ?",
    [data.email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/modal", function (req, res) {
  const email = req.body.modalEmail;
  const user = req.body.email;

  console.log("lender id", email);
  console.log("borrower id", user);
  db.query(
    "delete from SplitWise.transaction where lenderid= ? and borrowerid= ?",
    [email, user],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Result ", result);
        console.log("deleted successfully");
      }
    }
  );
});

app.get("/group", function (req, res) {
  const groupname = req.query.name;
  console.log("Group name is", groupname);

  db.query(
    "select expense.description, expense.paid_by, expense.group_name, expense.amount, expense.date, users.name as name from SplitWise.expense inner join SplitWise.users on expense.paid_by = users.email and expense.group_name= ? order by expense.date desc",
    [groupname],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Result:", result);
        res.send(result);
      }
    }
  );
});

app.post("/group", function (req, res) {
  const desc = req.body.description;
  const paid_by = req.body.paid_by;
  const group_name = req.body.groupname;
  const amount = req.body.amount;
  const date = req.body.date;

  console.log("Paid_By:", paid_by);
  db.query(
    "insert into expense (description, paid_by, group_name, amount, date) VALUES (?,?,?,?,?)",
    [desc, paid_by, group_name, amount, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Result:", result);
        res.send(result);
      }
    }
  );
  db.query(
    "select email from usersingroup where groupname =?",
    [group_name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const individualContribution = amount / result.length;
        for (var i = 0; i < result.length; i++) {
          if (result[i].email != paid_by) {
            db.query(
              "insert into transaction (lenderid, borrowerid, groupid, amount, date) VALUES (?,?,?,?, now())",
              [paid_by, result[i].email, group_name, individualContribution]
            );
          }
        }
      }
    }
  );
});

app.get("/members", function (req, res) {
  const groupname = req.query.name;
  console.log("Group name: ", groupname);
  db.query(
    "select users.name,users.email from SplitWise.usersingroup inner join SplitWise.users on usersingroup.email = users.email where groupname = ?",
    [groupname],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Group Members", result);
        res.send(result);
      }
    }
  );
});

app.get("/groupbalances", function (req, res) {
  const groupname = req.query.groupname;
  let balance = [];
  let obj = null;

  db.query(
    "select usersingroup.email, users.name from SplitWise.usersingroup inner join SplitWise.users on usersingroup.email = users.email where groupname = ?",
    [groupname],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Group Members12", result);
        for (let i = 0; i < result.length; i++) {
          db.query(
            "select coalesce((select SUM(amount) as sum from SplitWise.transaction inner join SplitWise.users on transaction.borrowerid=users.email where lenderid = ? and groupid=?), 0)- coalesce((select SUM(amount) as reduce from SplitWise.transaction inner join SplitWise.users on transaction.lenderid=users.email where borrowerid = ? and groupid=?), 0) as balance;",
            [result[i].email, groupname, result[i].email, groupname],

            (err, result2) => {
              if (err) {
                console.log(err);
              } else {
                obj = {
                  name: result[i].name,
                  balance: result2[0].balance,
                };
                balance.push(obj);
                if (i === result.length - 1) {
                  res.send(balance);
                }
              }
              console.log("Balance is", balance);
            }
          );
        }
      }
    }
  );
});

app.post("/settleup", function (req, res) {
  const email = req.body.name;
  console.log("Borrower ID", email);
  db.query(
    "delete from SplitWise.transaction where borrowerid= ?",
    [email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Result ", result);
        console.log("deleted successfully");
      }
    }
  );
});

app.post("/leaveGroup", function (req, res) {
  const name = req.body.name;
  const groupname = req.body.groupname;
  db.query(
    "select coalesce((select SUM(amount) as sum from SplitWise.transaction inner join SplitWise.users on transaction.borrowerid=users.email where lenderid = ? and groupid=?), 0)- coalesce((select SUM(amount) as reduce from SplitWise.transaction inner join SplitWise.users on transaction.lenderid=users.email where borrowerid = ? and groupid=?), 0) as balance;",
    [name, groupname, name, groupname],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Result is", result[0].balance);
        if (result[0].balance === "0") {
          console.log("after balance=0");
          db.query(
            "delete from SplitWise.usersingroup where email= ? and groupname=?",
            [name, groupname],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Is it coming here.");
                res.send("Exited from group");
              }
            }
          );
        } else {
          if (result[0].balance > 0) {
            res.send("Please wait to recieve the remaining amount.");
          } else if (result[0].balance < 0) {
            res.send("Please clear your dues to leave the group.");
          }
        }
      }
    }
  );
});

app.post("/acceptInvite", function (req, res) {
  const invite_to = req.body.invite_to;
  const groupname = req.body.group;
  console.log("Invite_to", invite_to);
  console.log("Grp name", groupname);
  db.query(
    "delete from SplitWise.invite where invite_to = ? and groupname = ?",
    [invite_to, groupname],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          "insert into SplitWise.usersingroup (email,groupname) VALUES(?,?)",
          [invite_to, groupname],
          (err, result2) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result2);
            }
          }
        );
      }
    }
  );
});

app.post("/rejectInvite", function (req, res) {
  const invite_to = req.body.invite_to;
  const groupname = req.body.group;
  console.log("Invite_to", invite_to);
  console.log("Grp name", groupname);
  db.query(
    "delete from SplitWise.invite where invite_to = ? and groupname = ?",
    [invite_to, groupname],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("invite rejected");
      }
    }
  );
});
module.exports = app;
