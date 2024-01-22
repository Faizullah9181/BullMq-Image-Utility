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
exports.ConnectDb = void 0;
const sequalize_1 = require("./sequalize");
const ConnectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            yield sequalize_1.sequelize.authenticate();
            console.log("Database connection has been established successfully.");
            yield sequalize_1.sequelize.sync({ alter: false });
        }))();
    }
    catch (err) {
        console.error("Database Error: ", err);
    }
});
exports.ConnectDb = ConnectDb;
