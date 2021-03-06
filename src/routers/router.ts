import express from "express";
import { CovidController } from "../controllers/controller";
import { CovidService } from "../services/service";

const covidRouter = express.Router();

const covidController = new CovidController(new CovidService());

// Adds states to the database from API
covidRouter.post(
  "/",
  covidController.addStatesToDbFromApi.bind(covidController)
);

// Fetch a list of user requests
covidRouter.get("/show/list", covidController.getList.bind(covidController));

// Gets statistics by state
covidRouter.get("/:state", covidController.getState.bind(covidController));

// Gets statistics by response id
covidRouter.get(
  "/state/:id",
  covidController.getStateById.bind(covidController)
);

export { covidRouter };
