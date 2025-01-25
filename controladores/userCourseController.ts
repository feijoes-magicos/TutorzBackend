import { RequestHandler } from "express";
import { UserCourseModel } from "../modelos/userCourseModel";

const modelValidator = (x: any): x is UserCourseModel => {
    if (x.rawAttributes) {
        return true;
    } else {
        return false;
    }
};
const userCourseModel: UserCourseModel = require("../modelos/userCourseModel");

const getCoursesByID: RequestHandler = async (request, response) => {
    const user = request.body.user;

    if (!user) {
        response.status(400).send("VOCÊ NÃO DEVERIA ESTAR AQUI");
        return;
    }

    userCourseModel
        .then((uCourseModel) => {
            if (modelValidator(uCourseModel)) {
                return uCourseModel.findAll({
                    where: { cod_usuario: user.cod_usuario},
                });
            }
        })
        .then((dados) => {
            response.status(200).send(dados);
        })
        .catch((e) => {
			response.status(500).json({message:"Falha em encontrar cursos relacionados", Error:e})
        });
};

module.exports = {getCoursesByID}
