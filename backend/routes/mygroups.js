const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.get("/mygroups", function (req, res) {
  const data = req.query;

  db.query(
    "select groupname from usersingroup where email = ?",
    [data.email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const result2 = [];
        for (var i = 0; i < result.length; i++) {
          result2.push(result[i].groupname);
        }
        console.log(result2);

        res.send(result2);
      }
    }
  );
});

router.get("/invites", function (req, res) {
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

router.post("/acceptInvite", function (req, res) {
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

router.post("/rejectInvite", function (req, res) {
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

module.exports = router;
