import express from "express";
import userController from "../controller/userController";
let router = express.Router();


const initUserRoute = (app) => {
  router.get("/users", userController.getUsers);
  router.get("/get-user/:id", userController.getUserById);
  router.put("/update-user", userController.updateUser);


  // //Tiền tố phía trước router
  return app.use("/", router);
};

export default initUserRoute;
