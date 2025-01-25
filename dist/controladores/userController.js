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
const bcrypt = require("bcrypt");
//validador de modelo de usuário
const modelValidator = (x) => {
    if (x.rawAttributes) {
        return true;
    }
    else {
        return false;
    }
};
const userModel = require("../modelos/userModel");
//função de middleware para o roteador do express
const createUserRequestHandler = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    //tentativa e retorno variado na criação de usuários no sistema ou no erro resultante do sequelize e suas operações
    const hash = yield bcrypt.hash(request.body.senha, 10);
    yield userModel
        .then((instance) => {
        const isModel = modelValidator(instance);
        if (isModel) {
            return instance;
        }
        else {
            throw new Error("falha ao cadastrar usuário");
        }
    })
        .then((model) => {
        if (modelValidator(model)) {
            return model.create({
                CPF: request.body.CPF,
                email: request.body.email,
                nome_usuario: request.body.nome_usuario,
                senha: hash,
            });
        }
        throw new Error("Modelo não válido");
    })
        .then(() => {
        response
            .status(200)
            .json({ message: "Usuário criado com sucesso" });
    })
        .catch((e) => {
        response.status(500).json({
            message: "falha ao criar o usuário",
            Error: e.name || "Erro desconhecido",
        });
    });
});
/*
 */
module.exports = { createUserRequestHandler };
