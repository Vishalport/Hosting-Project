import notificationModel from "../../../models/notification";
import status from "../../../enums/status";
import userModel from "../../../models/user";
const notificationService = {
    createNotification: async (insertObj) => {
        return await notificationModel.create(insertObj)
    },

    findNotification: async (instantObj) => {
        return await notificationModel.findOne(instantObj)
    },
    
    listNotification: async (instantObj) => {
        return await notificationModel.find(instantObj)
    },
    notificationList: async (instantObj) => {
        return await notificationModel.find(instantObj)
    },
    updateNotification: async (query, updateObj) => {
        return await notificationModel.findByIdAndUpdate(query, updateObj, { new: true });
      },
}

module.exports = { notificationService }