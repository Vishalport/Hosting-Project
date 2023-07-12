import Mongoose, { Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import status from "../enums/status";
import userType from "../enums/userType";
import notification from "../enums/notification"

var notificationModel = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    title: {
      type: String,
      default: "New Notificatoin is for you",
    },
    description: {
      type: String,
      default:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
    },
    notificationType : {
      type :String,
      default : notification.PUBLIC
    },
    status: { type: String, default: status.ACTIVE },
  },
  { timestamps: true }
);
notificationModel.index({ location: "2dsphere" });
notificationModel.plugin(mongooseAggregatePaginate);
notificationModel.plugin(mongoosePaginate);
module.exports = Mongoose.model("notification-Info", notificationModel);
