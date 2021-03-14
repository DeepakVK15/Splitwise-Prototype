const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.get("/myprofile", function (req, res) {
  const data = req.query;
  db.query("select * from users where email=?", [data.email], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Profile result ", result);
      res.send(result);
    }
  });
});

router.post("/myprofile", function(req,res){
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const language = req.body.language;
    const currency = req.body.currency;
    const timezone = req.body.timezone;

    console.log("Phone", phone);
    console.log("Currency", currency);

    console.log("timezone", timezone);

    db.query("update SplitWise.users set name = ?, phone=?, language=?, currency=?, timezone=? where email =?",[name, phone, language, currency, timezone,email]);

})

module.exports = router;
