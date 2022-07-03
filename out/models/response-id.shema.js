"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseIdShema = void 0;
const mongoose_1 = require("mongoose");
const responseId = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});
const responseIdShema = (0, mongoose_1.model)("responseId", responseId);
exports.responseIdShema = responseIdShema;
//# sourceMappingURL=response-id.shema.js.map