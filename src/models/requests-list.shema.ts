import { Schema, model } from "mongoose";

const responseList = new Schema({
  id: {
    type: String,
    required: true,
  },
  requestId: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});
const responseListShema = model("responseList", responseList);
export { responseListShema };
