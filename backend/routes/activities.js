const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.get("/myactivities", function (req, res) {
    const user = req.query.email;
    let resultList = [];
  
    db.query(
      "select * from usersingroup where email=?",
      [user],
      (err, result1) => {
        if (err) {
          console.log(err);
        } else {
          for (let i = 0; i < result1.length; i++) {
            db.query(
              "select activity.*, users.name from SplitWise.activity inner join SplitWise.users on activity.user = users.email where groupname = ? order by activity.id desc",
              [result1[i].groupname],
              (err, result2) => {
                if (err) {
                  console.log(err);
                } else {
                  resultList = resultList.concat(result2);
                  if (i === result1.length - 1) {
                    res.send(resultList);
                  }
                }
              }
            );
          }
        }
      }
    );
  });

  module.exports = router;
