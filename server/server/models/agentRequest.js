import Mongoose, { Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import status from '../enums/status';

var agentRequestModel = new Schema(

    {
        propertyId: [{ type: Schema.Types.ObjectId, ref: "property-Info" }],
        userId: [{ type: Schema.Types.ObjectId, ref: "user" }],
        name: {
            type: String
        },
        mobileNumber: {
            type: String
        },
        message: {
            type: String
        },
        status: {
            type: String,
            default: status.PENDING
        },
    },
    { timestamps: true }
);
agentRequestModel.index({ location: "2dsphere" })
agentRequestModel.plugin(mongooseAggregatePaginate)
agentRequestModel.plugin(mongoosePaginate);
module.exports = Mongoose.model("agentRequest", agentRequestModel);