const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema(
  {
    UserName: {
      type: String,
    },
    Location: {
      type: String,
    },
    Time: {
      type: Date,
      default: Date.now,
    },
    TimeOfDay: {
      type: String,
      default: "evening",
    },
    Price: {
      type: Number,
      default: 0,
    },
  },
  {
    toObject: {
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Price", priceSchema, "Price");
