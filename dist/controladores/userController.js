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
//função assíncrona que usa hash para descaracterizar a senha e grava o payload da request no banco de dados
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield bcrypt.hash(payload.senha, 10);
    const MaybeModel = new Promise((resolve) => {
        const userModel = require("../modelos/userModel");
        resolve(userModel);
    });
    MaybeModel.then((instance) => {
        const isModel = modelValidator(instance);
        if (isModel) {
            return instance;
        }
        else {
            throw new Error("falha ao cadastrar usuário");
        }
    })
        .then((model) => {
        model.create({
            CPF: payload.CPF,
            email: payload.email,
            nome_usuario: payload.nome_usuario,
            senha: hash,
        });
    })
        .catch((e) => {
        console.log(e);
    });
});
module.exports = { createUser };
