const app = require("../index");
const chai = require("chai");
chai.use(require("chai-http"));
const expect = require("chai").expect;
const agent = require("chai").request.agent(app);

describe("SplitWise", function () {
  describe("Login", function () {
    it("Successful Login", () => {
      agent
        .post("/login/")
        .send({ email: "deepak@gmail.com", password: "deepak12" })
        .then(function (res) {
          expect(res.text).to.equal('{"message":"login success"}');
        })
        .catch((error) => {
          console.log(error);
        });
    });

    it("Invalid Credentials", () => {
      agent
        .post("/login/")
        .send({ email: "deepak@gmail.com", password: "deepak" })
        .then(function (res) {
          expect(res.text).to.equal(
            '{"message":"Incorrect username or password."}'
          );
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });

  describe("Signup", function () {
    it("Successful Signup", () => {
      agent
        .post("/signup/")
        .send({ name: "test", email: "test@gmail.com", password: "test1234" })
        .then(function (res) {
          expect(res.text).to.equal('{"message":"sign up success"}');
        })
        .catch((error) => {
          console.log(error);
        });
    });

    it("Account Already Exists", () => {
      agent
        .post("/signup/")
        .send({ name: "test", email: "test@gmail.com", password: "test1234" })
        .then(function (res) {
          expect(res.text).to.equal(
            '{"message":"Account with email id already exists."}'
          );
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });

  describe("Send Invite", function () {
    it("Send invite to add a user to group", () => {
      agent
        .post("/group/addUserToGroup")
        .send({
          email: "panish@gmail.com",
          groupname: "MVJCE",
          invitedby: "deepak@gmail.com",
        })
        .then(function (res) {
          expect(res.text).to.equal("Invite sent to user.");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });

  describe("User Profile", function () {
    it("Update user profile", () => {
      agent
        .put("/profile/myprofile")
        .send({
          name: "DeepakVK",
          email: "deepak@gmail.com",
          phone: "6904448888",
          language: "English",
          currency: "$",
          timezone: "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi",
        })
        .then(function (res) {
          expect(res.text).to.equal("Profile updated successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });

  describe("Settle balance", function () {
    it("User settles the balance amount in a group", () => {
      agent
        .post("/transactions/settleUp")
        .send({ name: "dilip@gmail.com", groupname: "MVJCE" })
        .then(function (res) {
          expect(res.text).to.equal("Balance settled");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
});
