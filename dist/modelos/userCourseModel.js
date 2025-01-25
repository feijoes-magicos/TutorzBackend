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
const maybeSequelize = SequelizeFactory();
const sequelizeValidator = (maybeSequelize) => {
    return maybeSequelize instanceof sequelize_1.Sequelize;
};
const userCourseModel = (() => __awaiter(void 0, void 0, void 0, function* () {
    if (sequelizeValidator(maybeSequelize)) {
        return maybeSequelize.define("USUARIO_CURSO", {
            cod_usuario: {
                type: sequelize_1.DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
            },
            cod_curso: {
                type: sequelize_1.DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
            progresso: {
                type: sequelize_1.DataTypes.SMALLINT,
                allowNull: false,
                defaultValue: 0,
            },
        });
    }
    return undefined;
}))().then((MInstance) => {
    if (MInstance) {
        MInstance.sync();
        return MInstance;
    }
    return undefined;
});
module.exports = userCourseModel;
