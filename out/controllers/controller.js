"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CovidController = void 0;
const state_validation_1 = require("../validations/state.validation");
const http_error_1 = require("../errors/http-error");
const uuid_1 = require("uuid");
let data = require("../../states.json");
class CovidController {
    constructor(covidService) {
        this.covidService = covidService;
    }
    getState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const state = req.params.state.toUpperCase();
                const result = (0, state_validation_1.stateValidation)(state);
                if (!result)
                    throw new http_error_1.HttpError("No such state exists", 400);
                for (let element of data) {
                    if (element.state === state) {
                        const resId = (0, uuid_1.v4)();
                        this.covidService.addIdToDb(resId, state);
                        res.json({ Response_id: resId, element });
                    }
                }
            }
            catch (err) {
                res.json({ message: err.message });
            }
        });
    }
    getStateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const state = this.covidService.findStateById(id);
                for (let element of data) {
                    if (element.state === state) {
                        res.json({ element });
                    }
                }
            }
            catch (err) {
                res.json({ message: err.message });
            }
        });
    }
}
exports.CovidController = CovidController;
//# sourceMappingURL=controller.js.map