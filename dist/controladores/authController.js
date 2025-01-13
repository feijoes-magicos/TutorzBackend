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
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = new Promise((resolve) => {
    const MaybeModel = require("../modelos/userModel");
    resolve(MaybeModel);
});
const createToken = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = request.body;
    userModel
        .then((modelo) => {
        const dados = modelo.findOne({ where: { email: email } });
        return dados;
    })
        .then((dados) => {
        return {
            comparacao: bcrypt.compare(senha, dados === null || dados === void 0 ? void 0 : dados.dataValues.senha),
            query: dados,
        };
    })
        .then((metadados) => {
        var _a;
        if (metadados.comparacao) {
            const token = jwt.sign((_a = metadados.query) === null || _a === void 0 ? void 0 : _a.dataValues, process.env.SECRET_KEY);
            response.status(200).json({ token: token });
        }
    })
        .catch((e) => {
        response.status(500).json({ message: "falha ao autenticar o usuario", Error: e.name || "erro desconhecido" });
        console.log(e);
    });
});
module.exports = { createToken };
