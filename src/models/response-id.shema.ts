import { Schema, model } from "mongoose";

const responseId = new Schema({
  id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});
const responseIdShema = model("responseId", responseId);
export { responseIdShema };
