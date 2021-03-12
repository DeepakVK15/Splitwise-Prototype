const express = require("express");
const router = express.Router();
const passwordHash = require("password-hash");
const  db = require('../connection.js');

router.post("/", function (req, res) {
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

  router.get("/user", function (req, res) {
    const data = req.query;
    console.log("Email is", data.email);
    db.query(
      "SELECT * from users where email= ?",
      [data.email],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result[0].name);
        }
      }
    );
  });

  module.exports = router;