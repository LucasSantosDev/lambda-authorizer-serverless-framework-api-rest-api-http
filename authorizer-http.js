"use strict";

const jwt = require("jsonwebtoken");
const getCredentials = require("./secretManager");

function extractTokenFromHeader(e) {
  if (
    e.headers.authorization &&
    e.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return e.headers.authorization.split(" ")[1];
  } else {
    return e.headers.authorization;
  }
}

async function validateToken(token, event, callback) {
  try {
    const secret = await getCredentials();

    jwt.verify(token, secret, { expiresIn: 3600 });

    callback(null, {
      principalId: "user",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: event.routeArn,
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
