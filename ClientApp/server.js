// express is a node base library to create API
const express = require("express");
// This package will give us access to env variable
require("dotenv").config();

var jwt = require("express-jwt"); // Validate JWT and set req.user
var jwks = require("jwks-rsa"); // Retrieve RSA from a JSON Web Key set (JWKS) endpoint
const jwtCheck = jwt({
  // Dynamically provide a signing key based on the kind in the header
  // and the signing keys provided by the JWKS endpoint.
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5, // prevent attachers from requesting more than 5 per minute
    jwksUri: `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/.well-known/jwks.json`
  }),
  // Validate the audience and the issure
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}`,
  //This must match the algorithm selected in the Auth0 dashboard under app's dashboard setting under the OAuth tab
  algorithms: ["RS256"]
});

const app = express();

//public end point
app.get("/public", function(req, res) {
  res.json({
    message: "Hello from a public API"
  });
});

//private end point
app.get("/private", jwtCheck, function(req, res) {
  res.json({
    message: "Hello from a private API"
  });
});

app.listen(5002);
console.log("API server listening on" + process.env.REACT_APP_AUTH0_AUDIENCE);
