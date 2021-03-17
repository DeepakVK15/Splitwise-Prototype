const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.get("/lender", function (req, res) {
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

router.get("/borrower", function (req, res) {
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

router.post("/modal", function (req, res) {
  const email = req.body.modalEmail;
  const user = req.body.email;
  db.query(
    "delete from SplitWise.transaction where lenderid= ? and borrowerid= ?",
    [email, user],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Result ", result);
      }
    }
  );
});

router.post("/settleup", function (req, res) {
  const email = req.body.name;
  const groupname = req.body.groupname;
  db.query(
    "delete from SplitWise.transaction where borrowerid= ? and groupid=?",
    [email, groupname],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          "insert into SplitWise.activity(user,operation,groupname,amount,date,description) VALUES(?,?,?,?,now(), ?)",
          [email, "updated", groupname, null, null]
        );
        res.send("Balance settled");
      }
    }
  );
});

module.exports = router;
