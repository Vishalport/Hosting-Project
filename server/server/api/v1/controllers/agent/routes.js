import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
import upload from "../../../../helper/uploadHandler";

export default Express.Router()

  // .get("/ListActiveAgent", controller.ListActiveAgent)
  // .get("/ListPendingAgent", controller.ListPendingAgent)
  // .get("/ListRejectAgent", controller.ListRejectAgent)
  .post("/agentLogin", controller.agentLogin)
  .post("/agentRegister", controller.agentRegister)
  .post("/login", controller.login)
  .use(auth.verifyToken)
  .get("/getProfile", controller.getProfile)  
  .get("/UserDashboard", controller.Dashboard)
