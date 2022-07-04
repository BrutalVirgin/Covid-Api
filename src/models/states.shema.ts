import { Schema, model } from "mongoose";

const states = new Schema({
  id: {
    type: String,
    required: true,
  },
  state: {
    type: Object,
    required: true,
  },
});
const statesShema = model("states", states);
export { statesShema };
