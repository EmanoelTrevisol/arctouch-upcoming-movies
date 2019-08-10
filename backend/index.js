const mongoose = require("mongoose");
const config = require("./_config/config");

// Initiates mongodb connection
mongoose.connect(config.db, {
  config: {
    autoIndex: true
  },
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on("error", err => {
  console.error(`Unable to connect to database at ${config.db}`);
  console.error(err);
  console.trace(err);
  throw new Error(err);
});

const app = require("./_config/express");
require("./_config/routes")(app);

app.listen(config.port, () => {
  console.log(`Express server listening on port ${config.port}`);
});

module.exports = app;
