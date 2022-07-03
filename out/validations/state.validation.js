"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateValidation = void 0;
let data = require("../../states.json");
function stateValidation(state) {
    let statesArray = [];
    for (let element of data) {
        statesArray.push(element.state);
    }
    const condition = (element) => element === state;
    return statesArray.some(condition);
}
exports.stateValidation = stateValidation;
//# sourceMappingURL=state.validation.js.map