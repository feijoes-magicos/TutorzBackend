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
const path_1 = require("path");
const homedir = require("os").homedir();
const envPath = (0, path_1.join)(homedir + "/projetos/etec/TCC/server/.env");
require("dotenv").config({ path: envPath });
const jsonwebtoken = require("jsonwebtoken");
const authMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.headers.authorization) {
        response.status(401).send("Autorização requerida para acesso ao recurso");
        return;
    }
    const token = request.headers["authorization"].split(" ")[1];
    try {
        request.body.user = yield jsonwebtoken.verify(token, process.env.SECRET_KEY);
        next();
    }
    catch (e) {
        response.status(401).send("Falha na autenticação");
    }
});
module.exports = authMiddleware;
