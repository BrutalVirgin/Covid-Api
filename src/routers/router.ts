import express from "express";
import { CovidController } from "../controllers/controller";
import { CovidService } from "../services/service";

const covidRouter = express.Router();

const covidController = new CovidController(new CovidService());

covidRouter.get("/show/list", covidController.getList.bind(covidController));

covidRouter.get("/:state", covidController.getState.bind(covidController));

covidRouter.get(
  "/state/:id",
  covidController.getStateById.bind(covidController)
);

covidRouter.get("/test/1", covidController.test.bind(covidController));

export { covidRouter };
