const express = require("express");
const glob = require("glob");

const Boom = require("boom");
const path = require("path");

const rootPath = path.normalize(`${__dirname}/..`);

module.exports = app => {
  const apis = glob.sync(`${rootPath}/**/*Api.js`);

  apis.forEach(api => {
    require(api)(app);
  });

  app.use("/css", express.static(`${rootPath}/public/css`));
  app.use("/js", express.static(`${rootPath}/public/js`));

  app.use("/robots.txt", (req, res) => {
    res.sendFile(`${config.root}/robots/${env}`);
  });

  app.all("/*", (req, res) => {
    res
      .status(200)
      .set({
        "content-type": "text/html; charset=utf-8"
      })
      .sendFile(`${rootPath}/public/index.html`);
  });

  app.use(express.static(`${rootPath}/public/static`));

  // Error handling
  app.use((err, req, res, next) => {
    const error = Boom.isBoom(err) ? err : Boom.boomify(err);
    if (process.env.NODE_ENV !== "test") console.trace(error);
    return res.status(error.output.statusCode).json({
      error: error.name,
      message: error.message
    });
  });
};
