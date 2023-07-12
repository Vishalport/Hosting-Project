import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
import upload from '../../../../helper/uploadHandler';

export default Express.Router()
    .get('/viewStaticContent/:type', controller.viewStaticContent)
    .get('/staticContentList', controller.staticContentList)

    .use(auth.verifyToken)
    .put('/editStaticContent', controller.editStaticContent)
    .post('/addStaticContent', controller.addStaticContent)