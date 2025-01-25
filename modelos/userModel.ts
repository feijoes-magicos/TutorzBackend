import { DataTypes, Model, ModelDefined, Sequelize } from "sequelize";
const { SequelizeFactory } = require("../config/databaseConfig");

const sequelizeValidator = (
    maybeSequelize: any,
): maybeSequelize is Sequelize => {
    return maybeSequelize instanceof Sequelize;
};
const maybeSequelize = SequelizeFactory();
const isSequelize = sequelizeValidator(maybeSequelize);

interface UserAttributes {
    cod_usuario: number;
    nome_usuario: string;
    email: string;
    senha: string;
    CPF: string;
}
interface UserCreationAttributes {
    nome_usuario: string;
    email: string;
    senha: string;
    CPF: string;
}

const userModel: ModelUser = (async () => {
    if (isSequelize) {
        return maybeSequelize.define<
            Model<UserAttributes, UserCreationAttributes>
        >(
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
    }
    return undefined;
})()
    .then((Minstancia) => {
        if (Minstancia) {
            Minstancia.sync();
        }
        return Minstancia;
    })
    .catch(() => undefined);

module.exports = userModel;
export type ModelUser = Promise<
    ModelDefined<UserAttributes, UserCreationAttributes> | undefined
>;
