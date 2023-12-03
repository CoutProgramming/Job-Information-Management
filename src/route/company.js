import express from "express";
import companyController from "../controller/companyController";
let router = express.Router();


const initCompanyRoute = (app) => {
  router.get("/companies", companyController.getCompany);
  router.get("/get-company/:id", companyController.getCompanyById);
  router.post("/create-company", companyController.createCompany);
  router.put("/update-company", companyController.updateCompany);
  router.delete("/delete-company/:id", companyController.deleteCompany);


  // //Tiền tố phía trước router
  return app.use("/", router);
};

export default initCompanyRoute;
