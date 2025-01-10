import { DataTypes, Sequelize } from "sequelize";
const { SequelizeFactory } = require("../config/databaseConfig");

const sequelizeValidator = (
	maybeSequelize: any,
): maybeSequelize is Sequelize => {
	return maybeSequelize instanceof Sequelize;
};
const maybeSequelize = SequelizeFactory();
const isSequelize = sequelizeValidator(maybeSequelize);

const userModel = (async () => {
	if (isSequelize) {
		return maybeSequelize.define(
			"USUARIO",
			{
				cod_usuario: {
					type: DataTypes.BIGINT,
					allowNull: false,
					unique: true,
					autoIncrement: true,
					primaryKey: true,
				},
				nome_usuario: {
					type: DataTypes.STRING(80),
					allowNull: false,
				},
				email: {
					type: DataTypes.STRING(50),
					allowNull: false,
					unique: true,
				},
				senha: {
					type: DataTypes.STRING(60),
					allowNull: false,
				},
				CPF: {
					type: DataTypes.STRING(11),
					allowNull: false,
					unique: true,
				},
			},
			{
				tableName: "USUARIO",
			},
		);
	} else {
		throw new Error("falha em criar incidência");
	}
})()
	.then((instancia) => {
		instancia.sync();
		return instancia;
	})
	.catch((e) => {
		console.log(e);
	});

module.exports = userModel;
