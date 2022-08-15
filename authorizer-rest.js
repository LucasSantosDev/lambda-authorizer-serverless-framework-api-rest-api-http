"use strict";

const jwt = require("jsonwebtoken");
const SecretsManager = require("secretsManager");

function extractTokenFromHeader(e) {
  if (e.authorizationToken && e.authorizationToken.split(" ")[0] === "Bearer") {
    return e.authorizationToken.split(" ")[1];
  } else {
    return e.authorizationToken;
  }
}

async function validateToken(token, event, callback) {
  try {
    const secret = await new SecretsManager().getSecret("teste-jwt-rest");

    jwt.verify(token, secret, { expiresIn: 3600 });

    callback(null, {
      principalId: "user",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: event.methodArn,
          },
        ],
      },
    });
  } catch (err) {
    console.log(err);
    callback("Unauthorized");
  }
}

module.exports.handler = async (event, context, callback) => {
  let token = extractTokenFromHeader(event) || "";
  await validateToken(token, event, callback);
};
