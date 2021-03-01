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
  mysqlHost,
  mysqlUser,
  mysqlPassword,
  mysqlDatabase,
} = require("./utils/connection");
const { json } = require("body-parser");
const { response } = require("express");

// const { frontendURI } = require("./utils/config");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

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
});

//Allow Access Control
app.use(function (req, res, next) {
  //   res.setHeader("Access-Control-Allow-Origin", frontendURI);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
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
        path: "/"
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
  db.query('select * from usersingroup where groupname = ?',[groupname],
  (err,result) => {
    if(err){
      console.log(err);
    }
   if(result.length > 0){
     res.send({message: 'Group with the same name already exists.'})
   }
   else{
    for(var i=0;i<friends.length;i++){
      console.log("In loop");
      let email = friends[i].email;
      db.query("select * from users where email = ?",[email],
      (err, result3) =>{
        if(err){
          console.log(err);
        }
        if(result3.length === 1){
          db.query(
            "insert into usersingroup (email, groupname) VALUES (?,?)",
            [email, groupname],
            (err, result2) => {
              if (err) {
                console.log(err);}
             
            }
          )
        }
      })
   
    }
    res.send({message: "inserted users"});
   }
  }
  
  );
  
});
  module.exports = app;


