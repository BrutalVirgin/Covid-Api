import { CovidService } from "../services/service";
import { Response, Request } from "express";
import { stateValidation } from "../validations/state.validation";
import { HttpError } from "../errors/http-error";
import { v4 as uuidv4 } from "uuid";
var https = require("https");

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

          await this.covidService.addIdToDb(resId, state);

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

      const state = await this.covidService.findStateById(id);

      for (let element of data) {
        if (element.state === state) {
          await this.covidService.addRequestToList(uuidv4(), id, element);

          res.json({ element });
        }
      }
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

  async test(req: Request, res: Response) {
    const url = "https://api.covidtracking.com/v1/states/current.json";

    var statesData = "";
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

        // this.covidService.addStatesToDb("1", statesData);
      });
    });

    res.send(statesData);
  }
}
