import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
import upload from '../../../../helper/uploadHandler';


export default Express.Router()

    .use(auth.verifyToken)
    .post('/createNotification', controller.createNotification)
    .get('/viewNotification/:_id', controller.viewNotification)
    .get('/listNotification', controller.listNotification)
    .delete('/deleteNotification/:_id', controller.deleteNotification)








