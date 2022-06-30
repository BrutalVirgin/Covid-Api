import { responseIdShema } from "../models/response-id.shema";
import { HttpError } from "../errors/http-error";

export class CovidService {
  async addIdToDb(id: string, state: string) {
    await responseIdShema.create({ id: id, url: state });
  }

  async findStateById(id: string) {
    const record = await responseIdShema.findOne({ id: id });

    if (!record) throw new HttpError("Record with this id not found", 404);

    return record.url;
  }
}
