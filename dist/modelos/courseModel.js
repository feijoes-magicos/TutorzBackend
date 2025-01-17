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
const mongodb_1 = require("mongodb");
const AtlasFactory = new Promise((resolve, reject) => {
    const { AtlasFactory } = require("../config/databaseConfig");
    if (AtlasFactory) {
        resolve(AtlasFactory());
    }
    reject(new Error("Falha na conexão com o MongoDB"));
});
const courseModel = (() => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield AtlasFactory.then((instancia) => {
        if (instancia instanceof mongodb_1.MongoClient) {
            return instancia.db("Main").collection("courses");
        }
    }).catch((e) => {
        console.error(e);
        return undefined;
    });
    return collection;
}))();
module.exports = courseModel;
