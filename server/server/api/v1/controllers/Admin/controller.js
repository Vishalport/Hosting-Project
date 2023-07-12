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
import userType from "../../../../enums/userType";
const secret = speakeasy.generateSecret({ length: 10 });
import { userServices } from "../../services/user";
import property from "../../../../enums/property";
import agent from "../../../../enums/agent";
import { Error } from "mongoose";
const {
  UpdateProfile,
  checkUserExists,
  emailMobileExist,
  createUser,
  findUser,
  updateUser,
  countUser,
  ListUser,
  findList
} = userServices;

import { notificationService } from "../../services/notification";
const { createNotification, findNotification,  listNotification, notificationList, updateNotification } = notificationService;

import {agentService} from "../../services/agent"
const{ createAgent, assignAgent, assignNewAgent, checkAssigement , checkAgentExits,  ListActiveAgent, ListRejectedAgent, ListpendingAgent,  findAgent, countAgent} = agentService
export class adminController {

  async adminLogin(req, res, next) {
    let validationSchema = {
      email: Joi.string().optional(),
      password: Joi.string().optional(),
    };
    try {
      let validatedBody = await Joi.validate(req.body, validationSchema);
      const { email, password } = validatedBody;
      console.log("-----------------------Req.body-", email , password);
      let userResult = await findUser({ email: email, userType: userType.ADMIN });
      if (!userResult) {
        throw apiError.notFound(responseMessage.UNAUTHORIZED);
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
        token: token,
        refreshToken: refreshToken,
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
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: status.ACTIVE,
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.UNAUTHORIZED);
      }
      let DashboardResult = {
        totalActveUser: activeuser,
        totalBlockUserUser: blockuser,
        totalSeller: totalSelle,
        totalBuyer: totalBuyer,
        totalProduct: totalProduct,
        topTenProperty: property,
        totlaSubAdmin: totlaSubAdmin,
      };
      return res.json(
        new response(DashboardResult, responseMessage.USER_DETAILS)
      );
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  async ListActiveAgent(req, res, next) {
    try {
      let user = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: status.ACTIVE,
      });
      if (!user) {
        throw apiError.notFound(responseMessage.UNAUTHORIZED);
      }
      let userResult = await ListUser({
        status: status.ACTIVE,
        isAgent: agent.APROVE,
      });
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
      let user = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: status.ACTIVE,
      });
      if (!user) {
        throw apiError.notFound(responseMessage.UNAUTHORIZED);
      }
      let userResult = await ListUser({
        status: status.ACTIVE,
        isAgent: agent.PENDING,
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.AGENT_NOT_FOUND);
      }
      console.log("---->", userResult);
      return res.json(new response(userResult, responseMessage.AGENT_DETAILS));
    } catch (error) {
      return next(error);
    }
  }

  async ListRejectAgent(req, res, next) {
    try {
      let user = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: status.ACTIVE,
      });
      if (!user) {
        throw apiError.notFound(responseMessage.UNAUTHORIZED);
      }
      let userResult = await ListUser({
        status: status.ACTIVE,
        isAgent: agent.REJECT,
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      return res.json(new response(userResult, responseMessage.USER_DETAILS));
    } catch (error) {
      return next(error);
    }
  }

  async getUserProfile(req, res, next) {
    try {
      let user = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: status.ACTIVE,
      });
      if (!user) {
        throw apiError.notFound(responseMessage.UNAUTHORIZED);
      }
      let userResult = await findUser({ _id: req.params._id });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      return res.json(new response(userResult, responseMessage.USER_DETAILS));
    } catch (error) {
      return next(error);
    }
  }

  async aproveAgent(req, res, next) {
    try {
      let user = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: status.ACTIVE,
      });
      if (!user) {
        throw apiError.notFound(responseMessage.UNAUTHORIZED);
      }
      let userResult = await findUser({
        _id: req.params._id,
        userType: userType.AGENT,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.AGENT_NOT_FOUND);
      }
      var result = await UpdateProfile(
        { _id: userResult._id },
        {
          isAgent: agent.APROVE,
        }
      );
      return res.json(new response(result, responseMessage.AGENT_APROVED));
    } catch (error) {
      console.log("error", error);
      return next(error);
    }
  }

  async rejectAgent(req, res, next) {
    try {
      let user = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: status.ACTIVE,
      });
      if (!user) {
        throw apiError.notFound(responseMessage.UNAUTHORIZED);
      }
      let userResult = await findUser({
        _id: req.params._id,
        userType: userType.AGENT,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.AGENT_NOT_FOUND);
      }
      var result = await UpdateProfile(
        { _id: userResult._id },
        {
          isAgent: agent.REJECT,
        }
      );
      return res.json(new response(result, responseMessage.AGENT_REJECTED));
    } catch (error) {
      console.log("error", error);
      return next(error);
    }
  }

  async listPending_UserRequest_forAgent(req, res, next) {
    try {
      let user = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: status.ACTIVE,
      });
      if (!user) {
        throw apiError.notFound(responseMessage.UNAUTHORIZED);
      }
      let agentlist = await findList({
        status: status.PENDING,
      });
      if (!agentlist) {
        throw apiError.notFound(responseMessage.REQUEST_LIST_NOT_FOUND);
      }
      return res.json(new response(agentlist, responseMessage.REQUEST_LIST_FOUND));
    } catch (error) {
      console.log("error", error);
      return next(error);
    }
  }

  async assignNewAgent(req, res, next) {
    let validationSchema = {
      agentId: Joi.string().optional(),
      // userId: Joi.string().optional(),
      agentRequestId: Joi.string().optional(), 
    };
    try {
      let validatedBody = await Joi.validate(req.body, validationSchema);
      const { agentId, agentRequestId } = validatedBody;
      let user = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: status.ACTIVE,
      });
      if (!user) {
        throw apiError.notFound(responseMessage.UNAUTHORIZED);
      }
      console.log("agent _id : ----------",agentId );
      let findAgent = await checkAgentExits({ _id: agentId, status: status.ACTIVE, isAgent : agent.APROVE })
      console.log("agent Result : ---------------",findAgent );
      if (!findAgent) {
        throw apiError.notFound(responseMessage.AGENT_NOT_FOUND);
      }
      // let user1 = await findUser({ _id: userId, status: status.ACTIVE })
      // if (!user1) {
      //   throw apiError.notFound(responseMessage.USER_NOT_FOUND)
      // }
      validatedBody.assigmentInfo = agentRequestId;
      let isAgentAssigned = await checkAssigement({ agentId: agentId, status: status.ACTIVE })
      if (!isAgentAssigned) { await assignNewAgent(validatedBody) }
      else {
       await assignAgent({agentId : agentId}, { $addToSet: { assigmentInfo : agentRequestId } })
      }
      return res.json(new response(isAgentAssigned, responseMessage.ASSIGMENT_ASSIGN));

    } catch (error) {
      console.log(error);
      return next(Error)
    }
  }

  async adminNotificationList(req, res, next) {
    try {
      let user = await findUser({
        _id: req.userId,
        status: status.ACTIVE,
      });
      if (!user) {
        throw apiError.notFound(responseMessage.UNAUTHORIZED);
      }
      let notificationlist = await listNotification({
        status: status.ACTIVE,
        userId : user._id
      });
      if (!notificationlist) {
        throw apiError.notFound(responseMessage.NOTIFICATION_NOT_FOUND);
      }
      return res.json(new response(notificationlist, responseMessage.NOTIFICATION_FOUND));
    } catch (error) {
      console.log("error", error);
      return next(error);
    }
  }
}

export default new adminController();
