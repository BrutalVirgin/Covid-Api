import { CovidService } from "../services/service";
import { Response, Request } from "express";
import { stateValidation } from "../validations/state.validation";
import { HttpError } from "../errors/http-error";
import { v4 as uuidv4 } from "uuid";

let data = require("../../states.json");

export class CovidController {
  constructor(private covidService: CovidService) {}

  async getState(req: Request, res: Response) {
    try {
      const state = req.params.state.toUpperCase();

      const result = stateValidation(state);

      if (!result) throw new HttpError("No such state exists", 400);

      for (let element of data) {
        if (element.state === state) {
          const resId = uuidv4();

          this.covidService.addIdToDb(resId, state);

          res.json({ Response_id: resId, element });
        }
      }
    } catch (err: any) {
      res.json({ message: err.message });
    }
  }

  async getStateById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const state = this.covidService.findStateById(id);

      for (let element of data) {
        if (element.state === state) {
          res.json({ element });
        }
      }
    } catch (err: any) {
      res.json({ message: err.message });
    }
  }
}
