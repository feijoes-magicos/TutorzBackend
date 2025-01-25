import type { ModelUser } from "../modelos/userModel";
import { Request, Response, type RequestHandler } from "express";
const bcrypt = require("bcrypt");

//validador de modelo de usuário
const modelValidator = (x: any): x is ModelUser => {
	if (x.rawAttributes) {
		return true;
	} else {
		return false;
	}
};
const userModel: ModelUser = require("../modelos/userModel");

//função de middleware para o roteador do express
const createUserRequestHandler: RequestHandler<JSON> = async (
	request,
	response,
) => {
	//tentativa e retorno variado na criação de usuários no sistema ou no erro resultante do sequelize e suas operações
	const hash = await bcrypt.hash(request.body.senha, 10);
	await userModel
		.then((instance: any) => {
			const isModel = modelValidator(instance);
			if (isModel) {
				return instance;
			} else {
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
			throw new Error("Modelo não válido")
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
};
/*
 */
module.exports = { createUserRequestHandler };
