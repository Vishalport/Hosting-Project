import Mongoose, { Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import status from '../enums/status';

var agentAssigmentModel = new Schema(

    {
        agentId: [{ type: Schema.Types.ObjectId, ref: "user" }],
        assigmentInfo : [
            { type: Schema.Types.ObjectId, ref: "agentRequest" },
        ],
        status: {
            type: String,
            default: status.ACTIVE
        },
    },
    { timestamps: true }
);
agentAssigmentModel.index({ location: "2dsphere" })
agentAssigmentModel.plugin(mongooseAggregatePaginate)
agentAssigmentModel.plugin(mongoosePaginate);
module.exports = Mongoose.model("agent_Assigment", agentAssigmentModel);