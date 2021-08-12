const os = require("os");

const express = require("express");
const cors = require("cors");

const app = express();

const config = require("./config/config");

const listen = (expressApp, port) => {
  return new Promise((resolve, reject) => {
    expressApp.listen(port, () => {
      console.log(`api-server: listening on ${os.hostname()}: ${port}`);
    });
  });
};

Promise.all([listen(app, config.port)])
  .then((initializedEntities) => {
    app.use(cors());

    /**
     * If the middleware above this hasn't sent back a response, then there was no matching endpoint. We send back an HTTP 404.
     */
    app.use((req, res, next) => {
      res.status(404);
      res.send();
    });

    /**
     * This is the error handling middleware, all errors that are passed to middleware are processed here.
     */
    app.use((error, req, res, next) => {
      console.error(`api-server: ${error}`);
      res.status(500);
      res.send();
    });
  })
  .catch((reason) => {
    console.error(reason);

    process.exit(1);
  });
