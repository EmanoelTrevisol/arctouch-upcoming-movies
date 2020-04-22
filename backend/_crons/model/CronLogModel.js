const mongoose = require("mongoose");
const { statuses } = require("./CronLogStatics");

const CronLogSchema = new mongoose.Schema(
  {
    cronName: String,
    startTime: Date,
    endTime: Date,
    result: mongoose.Schema.Types.Mixed,
    status: {
      type: String,
      enum: Object.values(statuses),
      default: statuses.RUNNING
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

const CronLogModel = mongoose.model("CronLog", CronLogSchema);

module.exports = CronLogModel;
