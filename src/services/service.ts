import { responseIdShema } from "../models/response-id.shema";
import { responseListShema } from "../models/requests-list.shema";
import { HttpError } from "../errors/http-error";

export class CovidService {
  async addIdToDb(id: string, state: string) {
    await responseIdShema.create({ id: id, url: state });
  }

  async findStateById(id: string) {
    const record = await responseIdShema.findOne({ id: id });

    if (record === null) {
      throw new HttpError("Record with this id not found", 404);
    } else {
      return record.url;
    }
  }

  async addRequestToList(id: string, reqId: string, data: object) {
    await responseListShema.create({ id: id, requestId: reqId, data: data });
  }

  async showList(page: number) {
    const pageSize = 5;
    const skip = (page - 1) * pageSize;

    const res = await responseListShema
      .find({}, "requestId data")
      .skip(skip)
      .limit(pageSize);
    return { page, pageSize, res };
  }
}
