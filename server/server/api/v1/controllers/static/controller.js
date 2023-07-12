import Joi from "joi";
import _ from "lodash";
import config from "config";
import apiError from '../../../../helper/apiError';
import response from '../../../../../assets/response';
import responseMessage from '../../../../../assets/responseMessage';

import { staticServices } from '../../services/static';
const { createStaticContent, findStaticContent, updateStaticContent, staticContentList } = staticServices;

import { userServices } from '../../services/user';
const { findUser } = userServices;

import status from '../../../../enums/status';
import userType from '../../../../enums/userType';



export class staticController {

    //**************************  Static management Start *************************************************/

    /**
     * @swagger
     * /static/addStaticContent:
     *   post:
     *     summary: addStaticContent
     *     tags:
     *       - STATIC
     *     description: addStaticContent
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: addStaticContent
     *         description: addStaticContent
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/addStaticContent'
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async addStaticContent(req, res, next) {
        var validationSchema = Joi.object({
            type: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string().required()
        });
        try {
            const validatedBody = await validationSchema.validateAsync(req.body);
            const { type, title, description } = validatedBody;
            var result = await createStaticContent({ type: type, title: title, description: description })
            return res.json(new response(result, responseMessage.DATA_SAVED));
        } catch (error) {
            return next(error);
        }
    }    

    /**
     * @swagger
     * /static/viewStaticContent/{type}:
     *   get:
     *     summary: viewStaticContent
     *     tags:
     *       - STATIC
     *     description: viewStaticContent
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: type
     *         description: type
     *         in: path
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async viewStaticContent(req, res, next) {
        var validationSchema = Joi.object({
            type: Joi.string().required(),
        });
        try {
            const validatedBody = await validationSchema.validateAsync(req.params);
            var result = await findStaticContent({ type: validatedBody.type })
            if (!result) throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /static/editStaticContent:
     *   put:
     *     summary: editStaticContent
     *     tags:
     *       - STATIC
     *     description: editStaticContent
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: editStaticContent
     *         description: editStaticContent
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/editStaticContent'
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async editStaticContent(req, res, next) {
        var validationSchema = Joi.object({
            _id: Joi.string().required(),
            type: Joi.string().required(),
            title: Joi.string().optional(),
            description: Joi.string().optional(),
        });
        try {
            const validatedBody = await validationSchema.validateAsync(req.body);
            let staticRes = await findStaticContent({ _id: req.body._id })
            if (!staticRes) throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            var result = await updateStaticContent({ _id: validatedBody._id }, validatedBody)
            return res.json(new response(result, responseMessage.UPDATE_SUCCESS));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /static/staticContentList:
     *   get:
     *     summary: staticContentList
     *     tags:
     *       - STATIC
     *     description: staticContentList
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async staticContentList(req, res, next) {
        try {
            var result = await staticContentList({ status: { $ne: status.DELETE } })
            return res.json(new response(result, responseMessage.USER_CREATED));
        } catch (error) {
            return next(error);
        }
        console.log("dsds");
    }


    //**************************  Static management End *************************************************/


}

export default new staticController()