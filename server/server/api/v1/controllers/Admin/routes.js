import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
import upload from "../../../../helper/uploadHandler";

export default Express.Router()

  .post("/adminLogin", controller.adminLogin)
  .use(auth.verifyToken)
  .get("/Dashboard", controller.Dashboard)
  .get("/ListActiveAgent", controller.ListActiveAgent)
  .get("/ListPendingAgent", controller.ListPendingAgent)
  .get("/ListRejectAgent", controller.ListRejectAgent)
  .get("/getAgentProfile/:_id", controller.getUserProfile)
  .put("/aproveAgent/:_id", controller.aproveAgent)
  .put("/rejectAgent/:_id", controller.rejectAgent)
  .get("/listPending_UserRequest_forAgent", controller.listPending_UserRequest_forAgent)
  .post("/assignNewAgent", controller.assignNewAgent)
  .get("/adminNotificationList", controller.adminNotificationList)
