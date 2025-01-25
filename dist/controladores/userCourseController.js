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
const modelValidator = (x) => {
    if (x.rawAttributes) {
        return true;
    }
    else {
        return false;
    }
};
const userCourseModel = require("../modelos/userCourseModel");
const getCoursesByID = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const user = request.body.user;
    if (!user) {
        response.status(400).send("VOCÊ NÃO DEVERIA ESTAR AQUI");
        return;
    }
    userCourseModel
        .then((uCourseModel) => {
        if (modelValidator(uCourseModel)) {
            return uCourseModel.findAll({
                where: { cod_usuario: user.cod_usuario },
            });
        }
    })
        .then((dados) => {
        response.status(200).send(dados);
    })
        .catch((e) => {
        response.status(500).json({ message: "Falha em encontrar cursos relacionados", Error: e });
    });
});
module.exports = { getCoursesByID };
