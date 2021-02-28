"use strict";
const config = {
  //    secret: "cmpe273_kafka_passport_mongo",
  frontendURI: "http://localhost:3000",
  //    kafkaURI: "localhost:2181",
  mysqlUser: "admin",
  mysqlPassword: "adminaws",
  mysqlHost: "splitwise-database1.ciyuzmcv7xt0.us-west-1.rds.amazonaws.com",
  mysqlDatabase: "SplitWise",
  // awsBucket: "cmpe273twitter",
  // Keys can't be added here because AWS categorizes this as vulnerability.
  awsAccessKey: "",
  awsSecretAccessKey: "",
  awsPermission: "public-read",
};

module.exports = config;
