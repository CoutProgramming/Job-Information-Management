import express from "express";
import applyController from "../controller/applyController";
let router = express.Router();
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, appRoot + "/src/public/cv/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(pdf)$/)) {
      req.fileValidationError = 'Only pdf files are allowed!';
      return cb(new Error('Only pdf files are allowed!'), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });


const initApplyRoute = (app) => {
  router.get("/applies", applyController.getApply);
  router.get("/notification", applyController.getNotification);
  router.get("/get-apply/:id", applyController.getApplyById);
  router.get("/get-AllApply/:id", applyController.getAllApplyById);
  router.get("/getApplyIsCheck", applyController.getApplyIsCheck);
  router.post("/create-apply", applyController.createApply);
  router.put("/update-apply/:id", applyController.updateApply);
  router.delete("/delete-apply/:id", applyController.deleteApply);
  router.post("/create-notification", applyController.createNotification);
  router.post('/upload-cv', upload.single('cv-user'), applyController.handleUploadCV);



  // //Tiền tố phía trước router
  return app.use("/", router);
};

export default initApplyRoute;
