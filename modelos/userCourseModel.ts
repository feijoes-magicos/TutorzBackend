import { DataTypes, Model, ModelDefined, Sequelize } from "sequelize";

const { SequelizeFactory } = require("../config/databaseConfig");
const maybeSequelize = SequelizeFactory();

const sequelizeValidator = (
    maybeSequelize: any,
): maybeSequelize is Sequelize => {
    return maybeSequelize instanceof Sequelize;
};

const userCourseModel: UserCourseModel = (async () => {
    if (sequelizeValidator(maybeSequelize)) {
        return maybeSequelize.define<
            Model<UserCourseAttributes, UserCourseCreationAttributes>
        >(
            "USUARIO_CURSO",
            {
                cod_usuario: {
                    type: DataTypes.BIGINT,
                    primaryKey: true,
                    allowNull: false,
                },
                cod_curso: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                    allowNull: false,
                },
                progresso: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                    defaultValue: 0,
                },
            },
            { tableName: "USUARIO_CURSO" },
        );
    }
    return undefined;
})().then((MInstance) => {
    if (MInstance) {
        MInstance.sync();
        return MInstance;
    }
    return undefined;
});

interface UserCourseAttributes {
    cod_usuario: number;
    cod_curso: string;
    progresso: number;
}

interface UserCourseCreationAttributes {
    cod_usuario: number;
    cod_curso: string;
    progresso: number;
}

module.exports = userCourseModel;
export type UserCourseModel = Promise<
    ModelDefined<UserCourseAttributes, UserCourseCreationAttributes> | undefined
>;
