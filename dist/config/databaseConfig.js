"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 *para fins de segurança, toda a parte inicial que configura as variáveis de ambiente
 *para acesso ao banco de dados serão devidadamente escondidadas e corretamente tipadas
 * */
const sequelize_1 = require("sequelize");
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
const dialect = validateDialect("DIALECT", dialectOpt);
//esse padrão simples de design garante um erro claro na falha do código e a instanciação única da classe Sequelize
let singletonSQL;
module.exports.SequelizeFactory = () => {
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
