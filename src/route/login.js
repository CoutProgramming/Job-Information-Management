import express from "express";
let router = express.Router();
import APILogin from "../controller/loginController";

const initAPIAccount = (app) => {
  router.get("/accounts", APILogin.getALLAccounts);
  router.post("/login", APILogin.Login);
  router.post("/signup", APILogin.Signup);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPIAccount;
