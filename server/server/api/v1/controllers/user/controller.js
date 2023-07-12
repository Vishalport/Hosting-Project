import Joi from "joi";
import _ from "lodash";
import config from "config";
import apiError from "../../../../helper/apiError";
import response from "../../../../../assets/response";
import bcrypt from "bcryptjs";
import responseMessage, {
  USER_CREATED,
} from "../../../../../assets/responseMessage";
import commonFunction from "../../../../helper/util";
import jwt from "jsonwebtoken";
import status from "../../../../enums/status";
import speakeasy from "speakeasy";
import userType from "../../../../enums/userType";
const secret = speakeasy.generateSecret({ length: 10 });
import { userServices } from "../../services/user";
const {
  UpdateProfile,
  createRequest,
  checkUserExists,
  emailMobileExist,
  createUser,
  countTotalUser,
  findUser,
  findUserforRequest,
  updateUser,
  countUser,
  ListUser,
  findUserWithPopulate
} = userServices;
import { propertyService } from "../../services/property";
const {
  AddNewProperty,
  checkPropertyExists,
  PropertyList,
  AddNewComment,
  editProperty,
  findProperty,
  countProperty,
  ListProperty,
  ListComment,
} = propertyService;
export class userController {
  /**
   * @swagger
   * /user/userSignUp:
   *   post:
   *     tags:
   *       - USER
   *     description: userSignUp
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: userSignUp
   *         description: userSignUp
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/userSignup'
   *     responses:
   *       200:
   *         description: User created successfully
   *       409:
   *         description: This email already exists ./ This mobile number already exists.
   *       400:
   *         description:  Password and confirm password does not match
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */
  async Register(req, res, next) {
    const validationSchema = {
      email: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().optional(),
      mobileNumber: Joi.string().optional(),
      userName: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      const {
        email,
        password,
        confirmPassword,
        images,
        mobileNumber,
        userName,
      } = validatedBody;
      var userInfo = await findUser({ email: email });
      if (userInfo) {
        throw apiError.conflict(responseMessage.USER_EXISTS);
      } else {
        if (password != req.body.confirmPassword) {
          throw apiError.badRequest(responseMessage.NOT_MATCH);
        }
        validatedBody.otp = commonFunction.getOTP();
        validatedBody.otpExpireTime = Date.now() + 180000;
        validatedBody.password = bcrypt.hashSync(validatedBody.password);
        // validatedBody.refferalCode = commonFunction.makeReferral();
        await commonFunction.sendMail(email, validatedBody);
        var result = await createUser(validatedBody);
        console.log(result);
        return res.json(new response(result, responseMessage.USER_CREATED));
      }
    } catch (error) {
      console.log("error ==========> 79", error);
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/verifyOTP:
   *   post:
   *     tags:
   *       - USER
   *     description: verifyOTP
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: verifyOTP
   *         description: verifyOTP
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/verifyOTP'
   *     responses:
   *       200:
   *         description: OTP verified successfully.
   *       404:
   *         description: User not found..
   *       400:
   *         description: OTP expired. / Incorrect OTP.
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */
  async verifyOTP(req, res, next) {
    var validationSchema = {
      email: Joi.string().required(),
      otp: Joi.string().required(),
    };
    try {
      var validatedBody = await Joi.validate(req.body, validationSchema);
      const { email, otp } = validatedBody;
      var userResult = await findUser({ email: email });
      if (!userResult) {
        throw apiError.conflict(responseMessage.USER_NOT_FOUND);
      } else {
        if (Date.now() > userResult.otpExpireTime) {
          throw apiError.badRequest(responseMessage.OTP_EXPIRED);
        }
        if (userResult.otp != otp) {
          throw apiError.badRequest(responseMessage.INCORRECT_OTP);
        }
        var updateResult = await updateUser(
          { _id: userResult._id },
          { otpVerified: true, isReset: true }
        );
        var token = await commonFunction.getToken({
          _id: updateResult._id,
          email: updateResult.email,
          userType: updateResult.userType,
        });

        let refreshToken = await commonFunction.getRefeshToken({
          _id: userResult._id,
          email: userResult.email,
          userType: userResult.userType,
        });
        res.json({ userResult, token, refreshToken });
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/resendOTP:
   *   post:
   *     tags:
   *       - USER
   *     description: resendOTP
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: resendOTP
   *         description: resendOTP
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/resendOTP'
   *     responses:
   *       200:
   *         description: OTP has been sent successfully on register email.
   *       404:
   *         description: User not found.
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */
  async resendOTP(req, res, next) {
    var validationSchema = {
      email: Joi.string().required(),
    };
    try {
      var validatedBody = await Joi.validate(req.body, validationSchema);
      const { email } = validatedBody;
      var userInfo = await findUser({ email: email });
      if (!userInfo) {
        throw apiError.conflict(responseMessage.USER_NOT_FOUND);
      } else {
        let otp = await commonFunction.getOTP();
        let otpExpireTime = Date.now() + 180000;
        validatedBody.otp = otp;
        await commonFunction.sendMail(email, validatedBody);
        var userResult = await updateUser(
          { _id: userInfo._id },
          { otp: otp, otpExpireTime: otpExpireTime, otpVerified: false }
        );
        return res.json(new response(userResult, responseMessage.OTP_SEND));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/forgotPassword:
   *   post:
   *     tags:
   *       - USER
   *     description: forgotPassword
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: forgotPassword
   *         description: forgotPassword
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/forgotPassword'
   *     responses:
   *       200:
   *         description: OTP has been sent successfully on register email.
   *       404:
   *         description: User not found.
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */
  async forgotPassword(req, res, next) {
    var validationSchema = {
      email: Joi.string().required(),
    };
    try {
      var validatedBody = await Joi.validate(req.body, validationSchema);
      const { email } = validatedBody;
      var userResult = await findUser({
        $or: [{ email: email }, {}],
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      } else {
        let otp = await commonFunction.getOTP();
        let otpExpireTime = Date.now() + 180000;
        if (userResult.email == email) {
          await commonFunction.sendMail(email, userResult);
          console.log("Email sent..!!");
        }
        var updateResult = await updateUser(
          { _id: userResult._id },
          { otp: otp, otpExpireTime: otpExpireTime, isReset: true }
        );
        return res.json(new response(updateResult, responseMessage.OTP_SEND));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/resetPassword/{token}:
   *   put:
   *     tags:
   *       - USER
   *     description: resetPassword
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: path
   *         required: true
   *       - name: resetPassword
   *         description: resetPassword
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/resetPassword'
   *     responses:
   *       200:
   *         description: Password has been changed successfully.
   *       404:
   *         description: User not found.
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */
  async resetPassword(req, res, next) {
    var validationSchema = {
      newPassword: Joi.string().required(),
    };
    try {
      var validatedBody = await Joi.validate(req.body, validationSchema);
      var userResult = await findUser({ _id: req.userId });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      var updateResult = await updateUser(
        { _id: userResult._id },
        { isReset: true, password: bcrypt.hashSync(validatedBody.newPassword) }
      );
      return res.json(new response(updateResult, responseMessage.PWD_CHANGED));
    } catch (error) {
      return next(error);
    }
  }
  /**
   * @swagger
   * /user/changePassword:
   *   put:
   *     tags:
   *       - USER
   *     description: changePassword
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: oldPassword
   *         description: oldPassword
   *         in: formData
   *         required: true
   *       - name: newPassword
   *         description: newPassword
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Password has been changed successfully.
   *       400:
   *         description: Invalid password.
   *       404:
   *         description: User not found.
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */
  async changePassword(req, res, next) {
    const validationSchema = {
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
      headers: Joi.object()
        .keys({
          token: Joi.string().required(),
        })
        .unknown(true),
    };

    try {
      let validatedBody = await Joi.validate(req.body, validationSchema);
      let userResult = await findUser({
        _id: req.userId,
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      if (bcrypt.compareSync(validatedBody.oldPassword, userResult.password)) {
        var updated = await updateUser(
          { _id: userResult._id },
          { password: bcrypt.hashSync(validatedBody.newPassword) }
        );
        return res.json(new response(updated, responseMessage.PWD_CHANGED));
      }
      throw apiError.badRequest(responseMessage.PWD_NOT_MATCH);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/userLogin:
   *   post:
   *     tags:
   *       - USER
   *     description: login
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: email/mobilenumber
   *         in: formData
   *         required: true
   *       - name: password
   *         description: password
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Login successfully.
   *       402:
   *         description: Incorrect login credential provided.
   *       404:
   *         description: User not found.
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */

  async userLogin(req, res, next) {
    let validationSchema = {
      email: Joi.string().optional(),
      password: Joi.string().optional(),
    };
    try {
      let validatedBody = await Joi.validate(req.body, validationSchema);
      const { email, password } = validatedBody;
      console.log("-----------------------Req.body-", email);
      let userResult = await findUser({
        email: email,
        userType: userType.USER,
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
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
      let newResult = {
        token: token,
        refreshToken: refreshToken,
        user: userResult,
      };
      return res.json(new response(newResult, responseMessage.LOGIN));
      // res.json({ userResult, token, refreshToken });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/getProfile:
   *   get:
   *     tags:
   *       - USER
   *     description: getProfile
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: User token
   *         in: header
   *         required: true
   *     responses:
   *       200:
   *         description: Profile details found successfully.
   *       404:
   *         description: User not found.
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */
  async getProfile(req, res, next) {
    try {
      let userResult = await findUserWithPopulate({ _id: req.userId });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      return res.json(new response(userResult, responseMessage.USER_DETAILS));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/editProfile:
   *   put:
   *     tags:
   *       - USER
   *     description: update Profile for particular user that he want to update in future
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: mobileNumber
   *         description: mobileNumber
   *         in: formData
   *         required: false
   *       - name: firstName
   *         description: firstName
   *         in: formData
   *         required: false
   *       - name: firstName
   *         description: firstName
   *         in: formData
   *         required: false
   *       - name: lastName
   *         description: lastName
   *         in: formData
   *         required: false
   *       - name: country
   *         description: country
   *         in: formData
   *         required: false
   *       - name: countryCode
   *         description: countryCode
   *         in: formData
   *         required: false
   *       - name: companyName
   *         description: companyName
   *         in: formData
   *         required: false
   *       - name: tinNumber
   *         description: tinNumber
   *         in: formData
   *         required: false
   *       - name: gstNumber
   *         description: gstNumber
   *         in: formData
   *         required: false
   *       - name: state
   *         description: state
   *         in: formData
   *         required: false
   *       - name: address
   *         description: address
   *         in: formData
   *         required: false
   *       - name: city
   *         description: city
   *         in: formData
   *         required: false
   *       - name: zipCode
   *         description: zipCode
   *         in: formData
   *         required: false
   *       - name: dateOfBirth
   *         description: dateOfBirth
   *         in: formData
   *         required: false
   *       - name: profilePic
   *         description: profilePic
   *         in: formData
   *         type: file
   *         required: false
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async editProfile(req, res, next) {
    const validationSchema = {
      mobileNumber: Joi.string().allow("").optional(),
      firstName: Joi.string().allow("").optional(),
      lastName: Joi.string().allow("").optional(),
      country: Joi.string().allow("").optional(),
      countryCode: Joi.string().allow("").optional(),
      companyName: Joi.string().allow("").optional(),
      userName: Joi.string().allow("").optional(),
      state: Joi.string().allow("").optional(),
      address: Joi.string().allow("").optional(),
      city: Joi.string().allow("").optional(),
      pinCode: Joi.string().allow("").optional(),
      dateOfBirth: Joi.string().allow("").optional(),
      images: Joi.string().allow("").optional(),
      about: Joi.string().allow("").optional(),
    };
    try {
      if (req.body.email) {
        req.body.email = req.body.email.toLowerCase();
      }
      const validatedBody = await Joi.validate(req.body, validationSchema);
      const {
        firstName,
        lastName,
        mobileNumber,
        dateOfBirth,
        address,
        userName,
        state,
        about,
        city,
        pinCode,
        images,
      } = validatedBody;
      let userResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      var result = await UpdateProfile(
        { _id: userResult._id },
        {
          firstName: firstName,
          lastName: lastName,
          mobileNumber: mobileNumber,
          dateOfBirth: dateOfBirth,
          address: address,
          city: city,
          pinCode: pinCode,
          state: state,
          images: images,
          userName: userName,
          about: about,
        }
      );
      return res.json(new response(result, responseMessage.USER_UPDATED));
    } catch (error) {
      console.log("error", error);
      return next(error);
    }
  }

  async CountActiveUser(req, res, next) {
    try {
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.UNAUTHORIZED);
      }
      let countUser = await countTotalUser({ status: status.ACTIVE });
      return res.json(new response(countUser, responseMessage.USER_DETAILS));
    } catch (error) {
      return next(error);
    }
  }

  async CountBlockedUser(req, res, next) {
    try {
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.UNAUTHORIZED);
      }
      let countUser = await countTotalUser({ status: status.BLOCK });
      return res.json(new response(countUser, responseMessage.USER_DETAILS));
    } catch (error) {
      return next(error);
    }
  }

  async UserDashboard(req, res, next) {
    try {
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.USER,
        status: status.ACTIVE,
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.UNAUTHORIZED);
      }
      let DashboardResult = {
        totalLikedProperty: totalLikedProperty,
        totalSeller: totalSelle,
        totalBuyer: totalBuyer,
        totalProduct: totalProduct,
        topTenProperty: property,
        totlaSubAdmin: SUBADMIN,
      };
      return res.json(
        new response(DashboardResult, responseMessage.USER_DETAILS)
      );
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  async SleerDashboard(req, res, next) {
    try {
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.SELLER,
        status: status.ACTIVE,
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.UNAUTHORIZED);
      }
      let totalActveProperty = await totalActiveProperty({
        status: status.ACTIVE,
        userId: userResult._id,
      });
      let totalBlockProperty = await totalActiveProperty({
        status: status.BLOCK,
        userId: userResult._id,
      });
      let totalPendingProperty = await totalPendingProperty({
        status: status.ACTIVE,
        userId: userResult._id,
      });
      let totalMyBuyer = await totalMyBuyer({
        status: status.ACTIVE,
        SleerId: userResult._id,
      });
      let topTenProperty = await TopTenProperty({
        status: status.ACTIVE,
        userId: userResult._id,
      });

      let DashboardResult = {
        totalActveProperty: totalActveProperty,
        totalBlockProperty: totalBlockProperty,
        totalPendingProperty: totalPendingProperty,
        totalMyBuyer: totalMyBuyer,
        topTenProperty: topTenProperty,
      };

      return res.json(
        new response(DashboardResult, responseMessage.USER_DETAILS)
      );
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  async requestForAent(req, res, next) {
    const validationSchema = {
      message: Joi.string().allow("").required(),
      name: Joi.string().allow("").required(),
      mobileNumber: Joi.string().allow("").required(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      console.log("validatedBody", validatedBody);
      console.log("params", req.params);
      const {message, mobileNumber, name } = validatedBody;
      let userResult = await findUserforRequest({
        _id: req.userId,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let property = await findProperty({
        _id: req.params._id,
        status: status.ACTIVE,
      });
      if (!property) {
        throw apiError.notFound(responseMessage.PROPERTY_NOT_FOUND);
      }
      validatedBody.userId = userResult._id;
      validatedBody.propertyId = property._id;
      let data = await createRequest(validatedBody);
      return res.json(new response(data, responseMessage.REQUEST_SENT));
    } catch (error) {
      console.log(error);
    }
  }

  async UserList(req, res, next) {
    try {
      const page = req.params.page ? req.page.page : 1;
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN, 
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let UserData = await ListUser({
        userType: userType.USER,
        status: status.ACTIVE,
      });
      if (!UserData) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      return res.json(new response(UserData, responseMessage.USER_DETAILS));
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
}

export default new userController();
