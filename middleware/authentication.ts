import { RequestHandler } from "express";
import { join } from "path";

const homedir = require("os").homedir();
const envPath = join(homedir + "/projetos/etec/TCC/server/.env");
require("dotenv").config({ path: envPath });

const jsonwebtoken = require("jsonwebtoken");

const authMiddleware:RequestHandler = async (request, response, next) => {
	if(!request.headers.authorization){
		response.status(401).send("Autorização requerida para acesso ao recurso")
		return
	}
	const token = request.headers["authorization"].split(" ")[1]
	try{
		await jsonwebtoken.verify(token, process.env.SECRET_KEY)
		next()
	}catch(e){
		response.status(401).send("Falha na autenticação")
	}
}

module.exports = authMiddleware
