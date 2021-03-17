const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.get("/myprofile", function (req, res) {
  const data = req.query;
  db.query("select * from users where email=?", [data.email], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.put("/myprofile", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const language = req.body.language;
  const currency = req.body.currency;
  const timezone = req.body.timezone;

  db.query(
    "update SplitWise.users set name = ?, phone=?, language=?, currency=?, timezone=? where email =?",
    [name, phone, language, currency, timezone, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Profile updated successfully");
      }
    }
  );
});

module.exports = router;
