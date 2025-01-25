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
const sequelize_1 = require("sequelize");
const { SequelizeFactory } = require("../config/databaseConfig");
const sequelizeValidator = (maybeSequelize) => {
    return maybeSequelize instanceof sequelize_1.Sequelize;
};
const maybeSequelize = SequelizeFactory();
const isSequelize = sequelizeValidator(maybeSequelize);
const userModel = (() => __awaiter(void 0, void 0, void 0, function* () {
    if (isSequelize) {
        return maybeSequelize.define("USUARIO", {
            cod_usuario: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
            nome_usuario: {
                type: sequelize_1.DataTypes.STRING(80),
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                unique: true,
            },
            senha: {
                type: sequelize_1.DataTypes.STRING(60),
                allowNull: false,
            },
            CPF: {
                type: sequelize_1.DataTypes.STRING(11),
                allowNull: false,
                unique: true,
            },
        }, {
            tableName: "USUARIO",
        });
    }
    return undefined;
}))()
    .then((Minstancia) => {
    if (Minstancia) {
        Minstancia.sync();
    }
    return Minstancia;
})
    .catch(() => undefined);
module.exports = userModel;
