import response from "../../../../../assets/response";

import commonFunction from "../../../../helper/util";

export class uploadFileController {
  /**
   * @swagger
   * /files/uploadFiles:
   *   post:
   *     tags:
   *       - UploadFile
   *     summary: Upload single or multiple file to get file url,
   *     description: UploadFile
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: file
   *         description: file
   *         in: formData
   *         type : file
   *         required: true
   *     responses:
   *       200:
   *         description: File uploadded successfully
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */
  async uploadMultipulFiles(req, res, next) {
    try {
      console.log(req.files);
      var finalresult = [];
      for (let i = 0; i < req.files.length; i++) {
        var result = await commonFunction.getImageMultipleUrl(
          req.files[i].path
        );
        let obj = {
          fileName: String(req.files[i].filename).split('_')[String(req.files[i].filename).split('_').length - 1],
          url: result
        }
        finalresult.push(obj);
      }
      return res.json(new response(finalresult, `Files has been uploaded successfully`));
    } catch (error) {
      console.log("error ==========> file", error)
      return next(error);
    }
  }

  async uploadSingleFiles(req, res, next) {
    try {
      console.log("--------fiel log-----------------", req.files);
      var result = await commonFunction.getImageUrl(req.files[0].path);
      return res.json(new response(result, `Files has been uploaded successfully`));
    } catch (error) {
      console.log("error ==========> file", error)
      return next(error);
    }
  }

}
export default new uploadFileController();
