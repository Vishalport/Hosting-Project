import Joi from "joi";
import _ from "lodash";
import config from "config";
import apiError from "../../../../helper/apiError";
import response from "../../../../../assets/response";
import bcrypt from "bcryptjs";
import responseMessage from "../../../../../assets/responseMessage";
import commonFunction from "../../../../helper/util";
import jwt from "jsonwebtoken";
import status from "../../../../enums/status";
import speakeasy from "speakeasy";
import userType, { AGENT } from "../../../../enums/userType";
const secret = speakeasy.generateSecret({ length: 10 });
import { userServices } from "../../services/user";
import {agentService} from "../../services/agent"
import agent from "../../../../enums/agent";
import notification from "../../../../enums/notification"
const{ createAgent, ListActiveAgent, ListRejectedAgent, ListpendingAgent,  findAgent, countAgent} = agentService
const { UpdateProfile, checkUserExists, emailMobileExist, createUser, countTotalUser, findUser, updateUser, countUser, ListUser } = userServices;
export class agentController {

  async agentRegister(req, res, next) {
    const validationSchema = {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      mobileNumber: Joi.string().required(),
      userName: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().optional(),
      state: Joi.string().optional(),
      city: Joi.string().optional(),
      pinCode: Joi.string().optional(),
      address: Joi.string().optional(),
      permanentAddress: Joi.string().optional(),
      adhar: Joi.string().optional(),
      pan: Joi.string().optional(),
      about: Joi.string().optional(),
      images: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      const {
        firstName,
        lastName,
        userName,
        email,
        mobileNumber,
        password,
        confirmPassword,
        city,
        pinCode,
        address, 
        permanentAddress,
        adhar,
        pan,
        about,
        images
      } = validatedBody;
      var userInfo = await findUser({ email: email, userType : userType.AGENT, status : status.ACTIVE});
      if (userInfo) {
        throw apiError.conflict(responseMessage.AGENT_EXISTS);
      } else {
        if (password != req.body.confirmPassword) {
          throw apiError.badRequest(responseMessage.NOT_MATCH);
        }
        validatedBody.otp = commonFunction.getOTP();
        validatedBody.otpExpireTime = Date.now() + 180000;
        validatedBody.password = bcrypt.hashSync(validatedBody.password);
        validatedBody.userType  = userType.AGENT;
        // validatedBody.refferalCode = commonFunction.makeReferral();
        await commonFunction.sendMail(email, validatedBody);
        let Admin = await findUser({ userType: userType.ADMIN })
        let notificationBody = {
          title : "New Agent Registration",
          description : "there is a new User how is register him self as the aget, the application is pending to Aprove.", 
          userId : Admin._id,
          notificationType : notification.PRIVETE
        }
        console.log("notificaton----------",notificationBody );
        await commonFunction.pushNotificationToAdmin(notificationBody);
        // await commonFunction.sentSMS(mobile, validatedBody.otp);
        var result = await createUser(validatedBody);
        console.log(result);
        return res.json(new response(result, responseMessage.AGENT_CREATED));
      }
    } catch (error) {
      console.log("error ==========> 79", error);
      return next(error);
    }
  }

  async login(req, res, next) {
    let validationSchema = {
      email: Joi.string().optional(),
      password: Joi.string().optional(),
    };
    try {
      let validatedBody = await Joi.validate(req.body, validationSchema);
      const { email, password } = validatedBody;
      let userResult = await findUser({ email: email, userType : userType.AGENT});
      if (!userResult) {
        throw apiError.notFound(responseMessage.AGENT_NOT_FOUND);
      }
      if (userResult.otpVerified == false) {
        throw apiError.invalid(responseMessage.OTP_NOT_VERIFYED);
      }
      if(userResult.isAgent == agent.PENDING) {
        throw apiError.invalid(responseMessage.AGENT_NOT_TRUE);
      }
      if(userResult.isAgent == agent.REJECT) {
        throw apiError.invalid(responseMessage.AGENT_REJECT);
      }
      if (!bcrypt.compareSync(validatedBody.password, userResult.password)) {
        throw apiError.invalid(responseMessage.INCORRECT_LOGIN);
      }
      let token = await commonFunction.getToken({
        _id: userResult._id,
        email: userResult.email,
        userType: userResult.userType,
        isAgent : userResult.isAgent,
      });
      let refreshToken = await commonFunction.getRefeshToken({
        _id: userResult._id,
        email: userResult.email,
        userType: userResult.userType,
      });
      let newResult = ({
        token : token,
        refreshToken : refreshToken,
        user: userResult
      })
      return res.json(new response(newResult, responseMessage.LOGIN));
      // res.json({ userResult, token, refreshToken });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }


  async getProfile(req, res, next) {
    try {
      let userResult = await findUser({ _id: req.userId });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      return res.json(new response(userResult, responseMessage.USER_DETAILS));
    } catch (error) {
      return next(error);
    }
  }

  async ListActiveAgent(req, res, next) {
    try {
      let userResult = await ListUser({ status : status.ACTIVE });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      return res.json(new response(userResult, responseMessage.USER_DETAILS));
    } catch (error) {
      return next(error);
    }
  }

  async ListPendingAgent(req, res, next) {
    try {
      let userResult = await ListUser({ status : status.PENDING });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      return res.json(new response(userResult, responseMessage.USER_DETAILS));
    } catch (error) {
      return next(error);
    }
  }

  async ListRejectAgent(req, res, next) {
    try {
      let userResult = await ListUser({ status : status.REJECT });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      return res.json(new response(userResult, responseMessage.USER_DETAILS));
    } catch (error) {
      return next(error);
    }
  }

  async agentLogin(req, res, next) {
    let validationSchema = {
      email: Joi.string().optional(),
      password: Joi.string().optional(),
    };
    try {
      let validatedBody = await Joi.validate(req.body, validationSchema);
      const { email, password } = validatedBody;
      console.log("-----------------------Req.body-", email);
      let userResult = await findUser({ email: email, userType : userType.AGENT});
      if (!userResult) {
        throw apiError.notFound(responseMessage.AGENT_NOT_FOUND);
      }
      if (userResult.otpVerified == false) {
        throw apiError.invalid(responseMessage.OTP_NOT_VERIFYED);
      }
      if (!bcrypt.compareSync(validatedBody.password, userResult.password)) {
        throw apiError.invalid(responseMessage.INCORRECT_LOGIN);
      }
      let token = await commonFunction.getToken({
        _id: userResult._id,
        email: userResult.email,
        userType: userResult.userType,
      });
      let refreshToken = await commonFunction.getRefeshToken({
        _id: userResult._id,
        email: userResult.email,
        userType: userResult.userType,
      });
      let newResult = ({
        token : token,
        refreshToken : refreshToken,
        user: userResult
      })
      return res.json(new response(newResult, responseMessage.LOGIN));
      // res.json({ userResult, token, refreshToken });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  async Dashboard(req, res, next) {
    try {
        let userResult = await findUser({ _id: req.userId, userType: userType.AGENT, status: status.ACTIVE });
        if (!userResult) {
            throw apiError.notFound(responseMessage.UNAUTHORIZED);
        }
        let DashboardResult = ({
            totalSeller: totalSelle,
            totalBuyer: totalBuyer,
            totalProduct: totalProduct,
        })
        return res.json(new response(DashboardResult, responseMessage.USER_DETAILS));

    } catch (error) {
        console.log(error);
        return next(error)
    }
  }

}

export default new agentController();
