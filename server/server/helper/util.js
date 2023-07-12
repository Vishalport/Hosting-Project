import config from "config";
import Joi from "joi";
import jwt from "jsonwebtoken";
import Sender from "aws-sms-send";
import { notificationService } from "../api/v1/services/notification";
const { createNotification, findNotification, notificationList, updateNotification } = notificationService;
import { userServices } from "../api/v1/services/user";
const { UpdateProfile, checkUserExists, emailMobileExist, createUser, countTotalUser, findUser, updateUser, countUser, ListUser } = userServices;
// client.verify.v2.services(verifySid)
var aws_topic = "arn:aws:sns:us-east-1:729366371820:coinbaazar";
var config2 = {
  AWS: {
    accessKeyId: config.get("AWS.accessKeyId"),
    secretAccessKey: config.get("AWS.secretAccessKey"),
    region: config.get("AWS.region"),
  },
  topicArn: aws_topic,
};
var sender = new Sender(config2);

import nodemailer from "nodemailer";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: config.get("cloudinary.cloud_name"),
  api_key: config.get("cloudinary.api_key"),
  api_secret: config.get("cloudinary.api_secret"),
});

const accountSid = config.get("your_account_sid");
const authToken = config.get("your_auth_token");
const client = require("twilio")(accountSid, authToken);

module.exports = {
  // sendSms: async () => {
  //   client.verify.v2.services(verifySid).verifications.create({ to: "+919315753159", channel: "sms" })
  //     .then((verification) => console.log(verification.status))
  //     .then(() => {
  //       const readline = require("readline").createInterface({
  //         input: process.stdin,
  //         output: process.stdout,
  //       });
  //       readline.question("Please enter the OTP:", (otp) => {
  //         client.verify.v2
  //           .services(verifySid)
  //           .verificationChecks.create({ to: "+919315753159", code: otp })
  //           .then((verification_check) => console.log(verification_check.status))
  //           .then(() => readline.close());
  //       });
  //     });
  // },
  getOTP() {
    var otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
  },

  pushNotificationToAdmin(notification) {
    return new Promise((resolve, reject) => {
      try {
        let result = createNotification(notification)
        if (!result) {
          console.log("Error in line 60 in Util.js");
          reject();
        } else {
          console.log("result===>>", result);
          resolve(result);
        }
      } catch (error) {
        console.log(error);
      }
    });
  },

  pushNotification(body) {
    return new Promise((resolve, reject) => {
      try {
        let result = createNotification(body)
        if (error) {
          console.log("---ERR---------------------", error);
          reject(error);
        } else {
          console.log("result===>>", result);
          resolve(result);
        }
      } catch (error) {
        console.log(error);
      }
    });
  },

  publicNotification(body) {
    return new Promise((resolve, reject) => {
      try {
        let result = createNotification(body)
        if (error) {
          console.log("---ERR---------------------", error);
          reject(error);
        } else {
          console.log("result===>>", result);
          resolve(result);
        }
      } catch (error) {
        console.log(error);
      }
    });
  },

  // sentSMS(mobileNumber, otp) {
  //   return new Promise((resolve, reject) => {
  //     client.messages.create({
  //       body: `Hello from Moondive your OTP is : ${otp}`,
  //       from: "+919932627686",
  //       to: mobileNumber,
  //     }, function(error, result) {
  //       if (error) {
  //         console.log("---ERR---------------------", error);
  //         reject(error);
  //       } else {
  //         resolve(result);
  //       }
  //     });
  //   });
  // },

  getImageUrl(filePath) {
    console.log("-----FILE-   in util-------------------------", filePath);
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(filePath, function (error, result) {
        if (error) {
          console.log("---ERR---------------------", error);
          reject(error);
        } else {
          console.log("result===>>", result.secure_url);
          resolve(result.secure_url);
        }
      });
    });
  },

  getImageMultipleUrl(filePath) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(filePath, function (error, result) {
        if (error) {
          reject(error);
        } else {
          console.log("result===>>", result.secure_url);
          resolve(result.secure_url);
        }
      });
    });
  },

  sendMail(email, body) {
    console.log("email boyd----------------------------", body);
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "amansinghfoujdar001@gmail.com",
          pass: "brguqftysvopxibk",
        },
      });
      var mailOption = {
        from: "<no-reply@Moondive.co>",
        to: email,
        subject: "MoonDive account verification",
        // text: body,
        html: `<div style="font-size:15px">

        <img style="display: block; margin-left: auto; margin-right: auto;"src="https://cdn.templates.unlayer.com/assets/1638205026461-check-cross-symbols-with-opening-symbol-3d-rendering.png" width="125" height="100"  />        
        <p>Hello ${body.firstName ? body.firstName + "🤷" : "Dear 🤷"},</p>
        <p>Wellcome to Express-Real-State private Limited. <br/>
        Please use this verification code below on Express-Real-Estate to confirm your identity.</p>
        <hr/>
        <h5 style="text-align: center;">OTP VERIFICATION CODE : ${body.otp}</h5>
        <p style="text-align: center;">(this code will expire in 2 Minutes)</p>
        <hr/>
        For the general information about the portal, see using the Express-Real-Estate user Portal. for additional help contact : 9931627686<hr/>
        </p>
        <br/><br/>
        <p style="text-align: center;"> <small>not reply this message, this mailbox is not monitored thank you for using Express-Real-State Application.</small></p><p><br/><br/><br/>
          Thanks & regards,<br/>
          Express Real-State Private Limited<br/>
          <img src="https://static.wixstatic.com/media/e3d3d3_cb08a80ec6f7436d91ae2b5324757300~mv2.png/v1/fill/w_48,h_51,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/e3d3d3_cb08a80ec6f7436d91ae2b5324757300~mv2.png"/>               
          </p>
      </div>`,
      };
      transporter.sendMail(mailOption, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  aproveMail(email, body) {
    console.log("email boyd----------------------------", body);
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "amansinghfoujdar001@gmail.com",
          pass: "brguqftysvopxibk",
        },
      });
      var mailOption = {
        from: '"Fred Foo 👻" <foo@example.com>',
        to: email,
        subject: "MoonDive account verification",
        // text: body,
        html: `<div style="font-size:15px">
        <p>Hello ${body.firstName},</p>
        <p>wellcome to MoonDive Private Limited, we are here for your Account verification</p>
        <p>Please use the OTP : ${body.otp}
          to verify your Account.
        </p>
            If you did not request this, please ignore this email and please update your password if you have an account at MoonDive Private Limited. Have a Good day <hr/>
        </p>
        
          <p>
          Thanks & regards,<br/>
          MoonDive Private Limited<br/>
          <img src="https://static.wixstatic.com/media/e3d3d3_cb08a80ec6f7436d91ae2b5324757300~mv2.png/v1/fill/w_48,h_51,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/e3d3d3_cb08a80ec6f7436d91ae2b5324757300~mv2.png"/>               
          </p>
      </div>`,
      };
      transporter.sendMail(mailOption, (error, result) => {
        ////console.log()("error==>", error, "result==>", result);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  getToken: async (payload) => {
    var token = await jwt.sign(payload, config.get("jwtsecret"));
    return token;
  },


  getRefeshToken: async (payload) => {
    var token = await jwt.sign(payload, config.get("jwtsecret"), {
      expiresIn: "24h",
    });
    return token;
  },
};
