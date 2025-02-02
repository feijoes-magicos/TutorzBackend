"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeCache = require("node-cache");
const path_1 = require("path");
const homedir = require("os").homedir();
const envPath = (0, path_1.join)(homedir + "/projetos/etec/TCC/server/.env");
require("dotenv").config({ path: envPath });
const userRoutes = require("./rotas/userRouter");
const authRoutes = require("./rotas/authRouter");
const courseRoutes = require("./rotas/courseRouter");
const userCourseRoutes = require("./rotas/userCourseRouter");
const express = require("express")();
const jsonParser = require("express").json();
express.use(jsonParser);
express.listen(process.env.SERVER_PORT, () => {
    console.log("SERVIDOR FUNCIONANDO NA PORTA " + process.env.SERVER_PORT);
});
express.use("/api", userRoutes);
express.use("/api", authRoutes);
express.use("/api", courseRoutes);
express.use("/api", userCourseRoutes);
const { docUI, servidorDoc } = require("./docs/swagger");
express.use("/api-docs", servidorDoc, docUI);
const Cache = new NodeCache();
const paymentCredentialsGenerator = require("./config/payment");
paymentCredentialsGenerator()
    .then((dados) => {
    if (dados === null || dados === void 0 ? void 0 : dados.access_token) {
        Cache.set("credenciais", dados, dados.expires_in);
    }
})
    .catch((e) => {
    console.log(e);
});
setInterval(() => {
    paymentCredentialsGenerator(true)
        .then((dados) => {
        if (dados === null || dados === void 0 ? void 0 : dados.access_token) {
            Cache.set("credenciais", dados, dados.expires_in);
        }
    })
        .catch((e) => {
        console.log(e);
    });
}, 3000000);
module.exports = Cache;
