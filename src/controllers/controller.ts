import { CovidService } from "../services/service";
import { Response, Request } from "express";
import { stateValidation } from "../validations/state.validation";
import { HttpError } from "../errors/http-error";
import { v4 as uuidv4 } from "uuid";
var https = require("https");

export class CovidController {
  constructor(private covidService: CovidService) {}

  async getState(req: Request, res: Response) {
    try {
      const state = req.params.state.toUpperCase();

      const result = await stateValidation(state);

      if (result.length === 0) throw new HttpError("No such state exists", 400);

      const resId = uuidv4();
      const curState = result[0].state;

      await this.covidService.addIdToDb(resId, curState.state);

      res.json({ Response_id: resId, curState });
    } catch (err: any) {
      res.json({ message: err.message });
    }
  }

  async getStateById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const state = await this.covidService.findStateById(id);

      await this.covidService.addRequestToList(uuidv4(), id, state[0].state);

      res.json({ state: state[0].state });
    } catch (err: any) {
      res.json({ message: err.message });
    }
  }

  async getList(req: Request, res: Response) {
    try {
      let page: number = parseInt(req.query.page as string);

      if (!page) {
        page = 1;
      }

      const result = await this.covidService.showList(page);

      res.json({ result });
    } catch (err: any) {
      res.json({ message: err.message });
    }
  }

  async addStatesToDbFromApi(req: Request, res: Response) {
    try {
      const url = "https://api.covidtracking.com/v1/states/current.json";

      https.get(url, (response: Response) => {
        var buffer = "";

        response.on("data", function (chunk) {
          buffer += chunk;
        });

        response.on("end", async () => {
          const data = JSON.parse(buffer);

          for (var state of data) {
            const stateId = uuidv4();

            await this.covidService.addStatesToDb(stateId, state);
          }
        });
      });
      res.json({ message: "States added to DB" });
    } catch (err: any) {
      res.json({ message: err.message });
    }
  }
}
