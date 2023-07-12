import Mongoose, { Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import status from '../enums/status';

var agentModel = new Schema(
    {
        propertyId: [{ type: Schema.Types.ObjectId, ref: "property-Info" }],
        firstName: {
            type: String
        },
        status: {
            type: String,
            default: status.PENDING
        },
    },
    { timestamps: true }
);
agentModel.index({ location: "2dsphere" })
agentModel.plugin(mongooseAggregatePaginate);
agentModel.plugin(mongoosePaginate);
module.exports = Mongoose.model("agent", agentModel);