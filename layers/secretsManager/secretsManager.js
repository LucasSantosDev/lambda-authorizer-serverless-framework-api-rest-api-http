"use strict";

const AWS = require("aws-sdk");

module.exports = class SecretsManager {
  constructor(region = null) {
    this.client = new AWS.SecretsManager({
      region: region ? region : "us-east-1",
    });
  }

  async getSecret(environmentVarName) {
    let secret = process.env[String(environmentVarName).toUpperCase()];

    if (secret) {
      console.log("*** SECRET WAS IN THE CACHE");

      return secret;
    }

    const { SecretString } = await this.client
      .getSecretValue({ SecretId: environmentVarName })
      .promise();

    console.log("*** SECRET WAS FETCHED FROM SECRETS MANAGER");

    process.env[String(environmentVarName).toUpperCase()] = SecretString;

    return SecretString;
  }
};
