/*
 *para fins de segurança, toda a parte inicial que configura as variáveis de ambiente
 *para acesso ao banco de dados serão devidadamente escondidadas e corretamente tipadas
 * */

import { Dialect, Sequelize } from "sequelize";
import { MongoClient } from "mongodb";
import { join } from "path";

const homedir = require("os").homedir();
const envPath = join(homedir + "/projetos/etec/TCC/server/.env");
require("dotenv").config({ path: envPath });

const dialectOpt: Array<Dialect> = [
	"mysql",
	"postgres",
	"sqlite",
	"mariadb",
	"mssql",
	"db2",
	"snowflake",
	"oracle",
];

const validateForceString = (y: any): string => {
	const x = process.env[y];
	if (typeof x === "string") {
		return x;
	} else {
		return "inválido";
	}
};

const validateDialect = (x: any, y: Array<Dialect>): Dialect => {
	const z = validateForceString(x);
	for (const item of y) {
		if (item.toString() == z) {
			return item;
		}
	}
	return "postgres";
};

const database_name = validateForceString("DATABASE_NAME");
const username = validateForceString("USERNAME");
const password = validateForceString("PASSWORD");
const host = validateForceString("HOST");
const connection_string = validateForceString("CONNECTION_STRING")
const dialect = validateDialect("DIALECT", dialectOpt);

//esse padrão simples de design garante um erro claro na falha do código e a instanciação única da classe Sequelize
let singletonSQL: Sequelize | undefined;
const SequelizeFactory = () => {
	if (!singletonSQL) {
		const sequelize = new Sequelize(database_name, username, password, {
			host: host,
			dialect: dialect,
		});

		try {
			sequelize.authenticate();
			singletonSQL = sequelize;
			return singletonSQL;
		} catch {
			throw new Error(
				"Falha na autenticação do banco de dados relacional",
			);
		}
	}
	return singletonSQL;
};


let singletonClient: MongoClient | undefined;
const AtlasFactory = async () => {
	if (!singletonClient) {
		try {
			singletonClient = new MongoClient(connection_string)
			await singletonClient.connect()
			console.log("Servidor conectado ao mongodb com sucesso")
		}catch(error){
			singletonClient = undefined
			console.log(error)
		}
	}
	return singletonClient
}

module.exports = { SequelizeFactory, AtlasFactory };
