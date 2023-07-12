import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
import upload from "../../../../helper/uploadHandler";

export default Express.Router()

  .post("/userLogin", controller.userLogin)
  .post("/Register", controller.Register)
  .post("/verifyOTP", controller.verifyOTP)
  .post("/resendOTP", controller.resendOTP)
  .post("/forgotPassword", controller.forgotPassword)
  .use(auth.verifyToken)
  .put("/resetPassword/", controller.resetPassword)
  .get("/getProfile", controller.getProfile)
  .get("/UserList", controller.UserList)
  .put("/changePassword", controller.changePassword)
  .put("/editProfile", controller.editProfile)
  .get("/CountActiveUser", controller.CountActiveUser)
  .get("/CountBlockedUser", controller.CountBlockedUser)
  .get("/UserDashboard", controller.UserDashboard)
  .post("/requestForAent/:_id", controller.requestForAent)
