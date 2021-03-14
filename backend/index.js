"use strict";
const app = require("./app");

//routes
const login = require("./routes/login");
const signup = require("./routes/signup");
const group = require("./routes/group");
const mygroups = require("./routes/mygroups");
const transactions = require("./routes/transactions");
const activities = require("./routes/activities");
const profile = require("./routes/profile");

app.use("/login", login);
app.use("/signup", signup);
app.use("/group", group);
app.use("/mygroups", mygroups);
app.use("/transactions", transactions);
app.use("/activities", activities);
app.use("/profile",profile);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;