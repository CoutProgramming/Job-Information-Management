import express from "express";
import applyController from "../controller/applyController";
let router = express.Router();


const initApplyRoute = (app) => {
  router.get("/applies", applyController.getApply);
  router.get("/get-apply/:id", applyController.getApplyById);
  router.get("/get-AllApply/:id", applyController.getAllApplyById);
  router.post("/create-apply", applyController.createApply);
  router.delete("/delete-apply/:id", applyController.deleteApply);



  // //Tiền tố phía trước router
  return app.use("/", router);
};

export default initApplyRoute;
