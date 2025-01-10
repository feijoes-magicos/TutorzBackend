/*
 *para fins de segurança, toda a parte inicial que configura as variáveis de ambiente
 *para acesso ao banco de dados serão devidadamente escondidadas e corretamente tipadas 
 * */
import { Dialect, Sequelize } from "sequelize";
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
const dialect = validateDialect("DIALECT", dialectOpt);


//esse padrão simples de design garante um erro claro na falha do código e a instanciação única da classe Sequelize
let singletonSQL: Sequelize | undefined;
module.exports.SequelizeFactory = (): Sequelize | Error => {
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
      throw new Error("Falha na autenticação do banco de dados relacional");
    }
  }
  return singletonSQL;
};

