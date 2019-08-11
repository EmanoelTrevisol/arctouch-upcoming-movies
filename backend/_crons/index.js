const fs = require("fs");
const CronJob = require("cron").CronJob;

const crons = Object.create(null);

/**
 * Reads the directory for each file (cron) and starts it
 */
exports.startCrons = () => {
  fs.readdir(`${__dirname}/cronFiles/`, (error, data) => {
    const cronFiles = data.map(item => require(`./cronFiles/${item}`));

    cronFiles.forEach(function(cron) {
      const [name, config] = cron;

      crons[name] = new CronJob(config);
      crons[name].start();
    });
  });
};

/**
 * Returns a cron instance
 *
 * @param {String} cronName 	the desired cron name
 * @return {CronJob} the CronJob instance
 */
exports.get = cronName => {
  return crons[cronName];
};
