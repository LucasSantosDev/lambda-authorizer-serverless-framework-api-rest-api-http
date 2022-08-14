"use strict";
const AWS = require("aws-sdk");

const secretName = "test/lambda-authorizer";
const client = new AWS.SecretsManager({
  region: "us-east-1",
});
let secret;

const getCredentials = () => {
  return new Promise((resolve, reject) => {
    client.getSecretValue({ SecretId: secretName }, (err, data) => {
      if (err) {
        throw err;
      } else {
        if ("SecretString" in data) {
          secret = data.SecretString;
          resolve(secret);
        } else {
          let buff = new Buffer(data.SecretBinary, "base64");
          secret = buff.toString("ascii");
        }
      }
    });
  });
};

module.exports = getCredentials;
