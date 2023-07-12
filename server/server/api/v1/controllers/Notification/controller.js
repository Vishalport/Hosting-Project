import Joi from "joi";
import _ from "lodash";
import config from "config";
import apiError from '../../../../helper/apiError';
import response from '../../../../../assets/response';
import responseMessage from '../../../../../assets/responseMessage';
import status from '../../../../enums/status';
import auth from "../../../../helper/auth";
import { userServices } from '../../services/user';
import { notificationService } from "../../services/notification";
const { findUser } = userServices;
const { createNotification, findNotification, notificationList, updateNotification } = notificationService;
var responses;

export class notificationController {

    async createNotification(req, res, next) {
        const validationSchema = {
            title: Joi.string().required(),
            description: Joi.string().optional(),
            notificationType: Joi.string().optional(),
            image: Joi.string().optional()
        }
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            validatedBody.userId = userResult._id;
            var notificationResult = await createNotification(validatedBody);
            return res.json(new response(notificationResult, responseMessage.NOTIFICATION_ADD));
        }
        catch (error) {
            return next(error);
        }
    }

    async viewNotification(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required()
        }
        try {
            const { _id } = await Joi.validate(req.params, validationSchema);
            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var notificationResult = await findNotification({ _id: _id, status: { $ne: status.DELETE } });
            if (!notificationResult) {
                throw apiError.notFound(responseMessage.NOTIFICATION_NOT_FOUND);
            }
            return res.json(new response(notificationResult, responseMessage.NOTIFICATION_VIEW));
        }
        catch (error) {
            return next(error);
        }
    }

    async deleteNotification(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required(),
        }
        try {
            const { _id } = await Joi.validate(req.params, validationSchema);
            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var notificationResult = await findNotification({ _id: _id, status: { $ne: status.DELETE } });
            if (!notificationResult) {
                throw apiError.notFound(responseMessage.NOTIFICATION_NOT_FOUND);
            }
            var result = await updateNotification({ _id: notificationResult._id }, { status: status.DELETE });
            return res.json(new response(result, responseMessage.NOTIFICATION_DELETE));
        }
        catch (error) {
            return next(error);
        }
    }

    async listNotification(req, res, next) {
        try {
            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            let dataResults = await notificationList({ status: { $ne: status.DELETE } });
            if (dataResults.length == 0) {
                throw apiError.notFound(responseMessage.NOT);
            } else {
                return res.json(new response(dataResults, responseMessage.NOTIFICATION_VIEW));
            }
        }
        catch (error) {
            return next(error);
        }

    }
}

export default new notificationController()
