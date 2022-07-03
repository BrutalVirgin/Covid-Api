"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.covidRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controllers/controller");
const service_1 = require("../services/service");
const covidRouter = express_1.default.Router();
exports.covidRouter = covidRouter;
const covidController = new controller_1.CovidController(new service_1.CovidService());
covidRouter.get("/:state", covidController.getState.bind(covidController));
covidRouter.get("/state/:id", covidController.getStateById.bind(covidController));
//# sourceMappingURL=router.js.map