import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
import upload from '../../../../helper/uploadHandler';


export default Express.Router()

    .get('/ListRentProperty', controller.ListRentProperty)
    .get('/ListSellProperty', controller.ListSELLProperty)
    .get('/viewproperty/:_id', controller.viewproperty)
    .get('/countProperty/:_id', controller.countProperty)
    .get('/searchProperty', controller.searchProperty)
    .get('/PropertyList', controller.PropertyList)
    .get('/SoldproPertyList', controller.SoldproPertyList)
    .use(auth.verifyToken)
    .post('/addNewProperty', controller.addNewProperty)
    .get('/totalProperty', controller.totalProperty)
    .put('/edit/:_id', controller.edit)
    .put('/deleteProperty/:_id', controller.deleteProperty)
    .put('blockedProperty/:_id', controller.blockedProperty)
    .get('/enquiried-property', controller.edit)
    .post('/addComment/:_id', controller.addComment)
    .get('/commentList', controller.commentList)


