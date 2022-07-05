import { statesShema } from "../models/states.shema";

export async function stateValidation(curState: string) {
  return await statesShema.find({ "state.state": curState });
}
