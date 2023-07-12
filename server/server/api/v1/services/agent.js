import propertyModel from "../../../models/property";
import comment from "../../../models/comment";

import status from "../../../enums/status";
import propertyType from "../../../enums/property"
import userModel from "../../../models/user";
import agentAssigmentModel from "../../../models/agentAssigment";
const agentService = {
    createAgent: async (insertObj) => {
        return await propertyModel.create(insertObj)
    },

    ListActiveAgent: async (instantObj) => {
        return await propertyModel.find(instantObj)
    },

    ListRejectedAgent: async (instantObj) => {
        return await propertyModel.find(instantObj)
    },

    ListpendingAgent: async (instantObj) => {
        return await propertyModel.find(instantObj)
    },

    findAgent: async (instantObj) => {
        return await propertyModel.findOne(instantObj).populate("userId")
    },

    checkAssigement: async (instantObj) => {
        return await agentAssigmentModel.findOne(instantObj);
    },

    checkAgentExits: async (instantObj) => {
        return await userModel.findOne(instantObj)
    },

    countAgent: async (instantObj) => {
        return await propertyModel.count(instantObj)
    },

    assignNewAgent : async (insertObj) => {
        return await agentAssigmentModel.create(insertObj);
    },

    assignAgent : async (query, updateObj) => {
        return await agentAssigmentModel.findOneAndUpdate(query, updateObj, { new: true });
    },
}

module.exports = { agentService }