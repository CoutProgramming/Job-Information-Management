import express from "express";
import jobController from "../controller/jobController";
let router = express.Router();
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, appRoot + "/src/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });


const initJobRoute = (app) => {
  router.get("/jobs", jobController.getJobs);
  router.get("/job/:id", jobController.getJobById);
  router.get("/priority", jobController.getPriority);
  router.get("/major", jobController.getMajor);
  router.get("/education", jobController.getEducation);
  router.get("/search-job/:value", jobController.getJobBySearch);
  router.post("/create-job", jobController.createJob);
  router.put("/update-job", jobController.updateJob);
  router.delete("/delete-job/:id", jobController.deleteJob);
  return app.use("/", router);
};

export default initJobRoute;
