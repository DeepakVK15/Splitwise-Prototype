const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/creategroup", function (req, res) {
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
          "insert into SplitWise.activity(user,operation,groupname,amount,date,description) VALUES(?,?,?,?,now(), ?)",
          [email, "created", groupname, null, null]
        );

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

router.get("/group", function (req, res) {
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

router.post("/group", function (req, res) {
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
        db.query(
          "insert into SplitWise.activity(user,operation,groupname,amount,date, description) VALUES(?,?,?,?,now(), ?)",
          [paid_by, "added", group_name, amount, desc]
        );
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

router.post("/leaveGroup", function (req, res) {
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

router.post("/addUserToGroup", function (req, res) {
  const email = req.body.email;
  const groupname = req.body.groupname;
  const invitedby = req.body.invitedby;

  db.query(
    "insert into invite (invite_by, invite_to, groupname) VALUES (?,?,?)",
    [invitedby, email, groupname],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("invite inserted", result);
      }
    }
  );
});

router.get("/members", function (req, res) {
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

router.get("/groupbalances", function (req, res) {
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

module.exports = router;
