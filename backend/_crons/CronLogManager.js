const moment = require("moment");

const CronLogModel = require("./model/CronLogModel");
const { statuses: CronLogStatuses } = require("./model/CronLogStatics");

/**
 * Creates a doc in mongodb registering that the cron has started
 * @param {Object} arg 						the arg passed to the function
 * @param {String} arg.cronName 	the name of the cron that has just started
 * @return {String} mongodb _id string
 */
exports.start = async ({ cronName = "" }) => {
  try {
    const log = await CronLogModel.create({
      cronName,
      startTime: moment().format(),
      status: CronLogStatuses.RUNNING
    });

    return log._id.toString();
  } catch (err) {
    console.trace(err);
  }
};

/**
 * Updates a doc in mongodb registering the cron results and finish time
 * @param {Object} arg 						the arg passed to the function
 * @param {String} arg.cronLogId	the cron log id
 * @param {Object} arg.result			the cron results to be saved
 * @return {Object} the cron log object
 */
exports.end = async ({ cronLogId, result }) => {
  try {
    const log = await CronLogModel.findByIdAndUpdate(
      cronLogId,
      {
        $set: {
          status: CronLogStatuses.FINISHED,
          result,
          endTime: moment().format()
        }
      },
      { new: true }
    );

    return log.toObject();
  } catch (err) {
    console.trace(err);
  }
};
