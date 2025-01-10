import type { ModelUser, UserCreationAttributes } from "../modelos/userModel";
const bcrypt = require("bcrypt");

//validador de modelo de usuário
const modelValidator = (x: any): x is ModelUser => {
	if (x.rawAttributes) {
		return true;
	} else {
		return false;
	}
};

//função assíncrona que usa hash para descaracterizar a senha e grava o payload da request no banco de dados
const createUser = async (payload: UserCreationAttributes): Promise<void> => {
	const hash = await bcrypt.hash(payload.senha, 10);
	const MaybeModel = new Promise((resolve) => {
		const userModel: ModelUser = require("../modelos/userModel");
		resolve(userModel);
	});

	MaybeModel.then((instance: any) => {
		const isModel = modelValidator(instance);
		if (isModel) {
			return instance;
		} else {
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
};

module.exports = { createUser };
