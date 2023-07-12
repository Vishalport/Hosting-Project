//v7 imports
import user from "./api/v1/controllers/user/routes";
import file from "./api/v1/controllers/UploadFIle/routes"
import property from "./api/v1/controllers/property/routes";
import Admin from "./api/v1/controllers/admin/routes";
import agent from "./api/v1/controllers/agent/routes";
import statics from "./api/v1/controllers/static/routes";
import notification from "./api/v1/controllers/Notification/routes";
import wishList from "./api/v1/controllers/wishlist/routes"


/**
 *
 *
 * @export
 * @param {any} app
 */

export default function routes(app) {

  app.use('/api/v1/user', user);
  app.use('/api/v1/agent', agent);
  app.use('/api/v1/file', file);
  app.use('/api/v1/property', property);
  app.use('/api/v1/Admin', Admin)
  app.use("/api/v1/statics", statics)
  app.use("/api/v1/notification", notification)
  app.use("/api/v1/wishList", wishList)

  return app;
}
