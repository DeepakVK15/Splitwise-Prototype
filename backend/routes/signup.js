const express = require("express");
const router = express.Router();
const passwordHash = require("password-hash");
const  db = require('../connection.js');

router.post("/", function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = passwordHash.generate(req.body.password);
  
    db.query("SELECT * from users where email= ?", [email], (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length === 0) {
        db.query(
          "insert into users (name, email, password, phone, currency, timezone, language) VALUES (?,?,?,?,?,?,?)",
          [name, email, password, "", "$", "(GMT-08:00) Pacific Time (US & Canada)", "English"],
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

  module.exports = router;