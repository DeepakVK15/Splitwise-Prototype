"use strict";
const app = require("./app");

// //routes
// const login = require("./routes/login");
// const signup = require("./routes/signup");
// const profile = require("./routes/profile");
// const follow = require("./routes/follow");
// const tweets = require("./routes/tweets");
// const tweetActions = require("./routes/tweetActions");
// const messages = require("./routes/messages");
// const bookmarks = require("./routes/bookmarks");
// const account = require("./routes/account");
// const search = require("./routes/search");
// const list = require("./routes/list");
// const analytics = require("./routes/analytics");

// app.use("/api/login", login);
// app.use("/api/signup", signup);
// app.use("/api/profile", profile);
// app.use("/api/follow", follow);
// app.use("/api/tweets", tweets);
// app.use("/api/tweets", tweetActions);
// app.use("/api/message", messages);
// app.use("/api/bookmark", bookmarks);
// app.use("/api/account", account);
// app.use("/api/search", search);
// app.use("/api/list", list);
// app.use("/api/analytics", analytics);

//Route to get All Books when user visits the Home Page

// var users = [
  
// ]

// app.post('/signup', function(req,res){
//   const user = {
//     Name: req.body.name,
//     Title: req.body.email,
//     Password: req.body.password
//   };
//   users.push(user);
//   console.log(users);
 
// })

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;