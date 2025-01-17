"use strict";
/*
 *para fins de segurança, toda a parte inicial que configura as variáveis de ambiente
 *para acesso ao banco de dados serão devidadamente escondidadas e corretamente tipadas
 * */
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
const sequelize_1 = require("sequelize");
const mongodb_1 = require("mongodb");
const path_1 = require("path");
const homedir = require("os").homedir();
const envPath = (0, path_1.join)(homedir + "/projetos/etec/TCC/server/.env");
require("dotenv").config({ path: envPath });
const dialectOpt = [
    "mysql",
    "postgres",
    "sqlite",
    "mariadb",
    "mssql",
    "db2",
    "snowflake",
    "oracle",
];
const validateForceString = (y) => {
    const x = process.env[y];
    if (typeof x === "string") {
        return x;
    }
    else {
        return "inválido";
    }
};
const validateDialect = (x, y) => {
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
const connection_string = validateForceString("CONNECTION_STRING");
const dialect = validateDialect("DIALECT", dialectOpt);
//esse padrão simples de design garante um erro claro na falha do código e a instanciação única da classe Sequelize
let singletonSQL;
const SequelizeFactory = () => {
    if (!singletonSQL) {
        const sequelize = new sequelize_1.Sequelize(database_name, username, password, {
            host: host,
            dialect: dialect,
        });
        try {
            sequelize.authenticate();
            singletonSQL = sequelize;
            return singletonSQL;
        }
        catch (_a) {
            throw new Error("Falha na autenticação do banco de dados relacional");
        }
    }
    return singletonSQL;
};
let singletonClient;
const AtlasFactory = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!singletonClient) {
        try {
            singletonClient = new mongodb_1.MongoClient(connection_string);
            yield singletonClient.connect();
            console.log("Servidor conectado ao mongodb com sucesso");
        }
        catch (error) {
            singletonClient = undefined;
            console.log(error);
        }
    }
    return singletonClient;
});
module.exports = { SequelizeFactory, AtlasFactory };
