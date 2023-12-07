import express from "express";
import applyController from "../controller/applyController";
let router = express.Router();


const initApplyRoute = (app) => {
  router.get("/applies", applyController.getApply);
  router.get("/notification", applyController.getNotification);
  router.get("/get-apply/:id", applyController.getApplyById);
  router.get("/get-AllApply/:id", applyController.getAllApplyById);
  router.get("/getApplyIsCheck", applyController.getApplyIsCheck);
  router.post("/create-apply", applyController.createApply);
  router.put("/update-apply/:id", applyController.updateApply);
  router.delete("/delete-apply/:id", applyController.deleteApply);
  router.post("/create-notification", applyController.createNotification)



  // //Tiền tố phía trước router
  return app.use("/", router);
};

export default initApplyRoute;
