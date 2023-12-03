import express from "express";
import configViewEngine from "./configs/viewEngine";
import initJobRoute from "./route/job";
import initCompanyRoute from "./route/company"
import initApplyRoute from "./route/apply";
import initAPIAccount from "./route/login";
import initUserRoute from "./route/user";
import cors from 'cors'

require("dotenv").config();

const app = express();

//Config local
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
const port = process.env.PORT;

//Config body-parse to send data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Config view engine
configViewEngine(app);

//init web route
initJobRoute(app);
initCompanyRoute(app);
initApplyRoute(app);
initAPIAccount(app);
initUserRoute(app);

//Config local
app.listen(port, () => {
  console.log("listening on port: " + port);
});
