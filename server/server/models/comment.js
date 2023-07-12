import Mongoose, { Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import status from '../enums/status';

var commentModel = new Schema(

    {
        userId: { type: Schema.Types.ObjectId, ref: "user" },
        propertyId: { type: Schema.Types.ObjectId, ref: "property-Info" },
        comment: {
            type: String
        },
        status: {
            type: String,
            default: status.ACTIVE
        },
    },
    { timestamps: true }
);
commentModel.index({ location: "2dsphere" })
commentModel.plugin(mongooseAggregatePaginate)
commentModel.plugin(mongoosePaginate);
module.exports = Mongoose.model("comment", commentModel);