"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const homedir = require("os").homedir();
const envPath = (0, path_1.join)(homedir + "/projetos/etec/TCC/server/.env");
require("dotenv").config({ path: envPath });
const SwaggerUi = require("swagger-ui-express");
const SwaggerJsDoc = require("swagger-jsdoc");
const opt = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Tutorz",
            version: "1.0.0",
            description: "API para um aplicativo voltado à tutoria",
        },
        servers: [{ url: `http:/localhost:${process.env.SERVER_PORT}` }],
    },
    apis: ["../rotas/*.js"],
};
const especificacao = SwaggerJsDoc(opt);
const servidorDoc = SwaggerUi.serve;
const docUI = SwaggerUi.setup(especificacao);
module.exports = {
    servidorDoc,
    docUI,
};
