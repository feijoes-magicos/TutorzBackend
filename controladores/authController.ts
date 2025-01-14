import { RequestHandler } from "express";
import { ModelUser } from "../modelos/userModel";
import { join } from "path";

const homedir = require("os").homedir();
const envPath = join(homedir + "/projetos/etec/TCC/server/.env");
require("dotenv").config({ path: envPath });

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel: Promise<ModelUser> = new Promise((resolve) => {
    const MaybeModel = require("../modelos/userModel");
    resolve(MaybeModel);
});

const createToken: RequestHandler = async (request, response, next) => {
    const { email, senha } = request.body;
    userModel
        .then((modelo) => {
            const dados = modelo.findOne({ where: { email: email } });
            return dados;
        })
        .then((dados) => {
            return {
                comparacao: bcrypt.compare(senha, dados?.dataValues.senha),
                query: dados,
            };
        })
        .then((metadados) => {
            if (metadados.comparacao) {
                const token = jwt.sign(metadados.query?.dataValues, process.env.SECRET_KEY, {expiresIn:"1h"});
                response.status(200).json({ usuario:metadados.query?.dataValues.nome_usuario, token: token });
            }
        })
        .catch((e) => {
            response.status(500).json({ message:"falha ao autenticar o usuario", Error: e.name || "erro desconhecido" });
        });
};

module.exports = { createToken };
