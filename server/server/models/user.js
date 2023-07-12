import Mongoose, { Schema, Types } from "mongoose";
const { ObjectId } = require('mongoose').Types;
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import userType from "../enums/userType";
import status from '../enums/status';
import bcrypt from 'bcryptjs';
import agent from "../enums/agent";

var userModel = new Schema(
  {
    email: {
      type: String
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    countryCode: {
      type: String
    },
    mobileNumber: {
      type: String
    },
    password: {
      type: String
    },
    dateOfBirth: {
      type: String
    },
    otp: {
      type: String
    },
    otpVerified: {
      type: Boolean,
      default: false
    },
    isReset: {
      type: Boolean,
      default: false
    },
    userType: {
      type: String,
      default: userType.USER
    },
    status: {
      type: String,
      default: status.ACTIVE
    },
    userName: {
      type: String
    },
    address: {
      type: String
    },
    permanentAddress: {
      type: String
    },
    city: {
      type: String
    },
    pinCode: {
      type: String,
    },
    state: {
      type: String
    },
    otpExpireTime: {
      type: Number
    },
    adhar: {
      type: String,
    },
    pan: {
      type: String
    },
    about: {
      type: String
    },
    images: {
      type: String,
      default: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1687936779~exp=1687937379~hmac=008ef1c3a860047c973de5853da2539e34d1d82694a7c4c3a8214cd3df3a54ed"
    },
    wishList: [{
      type: ObjectId, ref: "property-Info"
    }],
    isAgent: {
      type: String,
      default: agent.PENDING
    },
  },
  { timestamps: true }
);
userModel.index({ location: "2dsphere" })
userModel.plugin(mongooseAggregatePaginate)
userModel.plugin(mongoosePaginate);
module.exports = Mongoose.model("user", userModel);

Mongoose.model("user", userModel).find({ userType: userType.ADMIN }, async (err, result) => {
  if (err) {
    console.log("DEFAULT ADMIN ERROR", err);
  }
  else if (result.length != 0) {
    console.log("Default Admin. 😀😀")
  }
  else {

    let obj = {
      userType: userType.ADMIN,
      firstName: "vishal",
      lastName: "kumar",
      userName: "vishalport",
      countryCode: "+91",
      mobileNumber: "9931627686",
      email: "vishal.kumar@moondive.co",
      dateOfBirth: "15-01-2000",
      password: bcrypt.hashSync("Moondive@1"),
      address: "Delhi, India",
      profilePic: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1687936779~exp=1687937379~hmac=008ef1c3a860047c973de5853da2539e34d1d82694a7c4c3a8214cd3df3a54ed",
    };

    Mongoose.model("user", userModel).create(obj, async (err1, result1) => {
      if (err1) {
        console.log("Default admin  creation error", err1);
      } else {
        console.log("Default admin created 😀😀");
      }
    });
  }
});