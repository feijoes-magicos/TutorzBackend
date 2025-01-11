"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const homedir = require("os").homedir();
const envPath = (0, path_1.join)(homedir + "/projetos/etec/TCC/server/.env");
require("dotenv").config({ path: envPath });
const userRoutes = require("./rotas/userRouter");
const express = require("express")();
const jsonParser = require("express").json();
express.use(jsonParser);
express.listen(process.env.SERVER_PORT, () => {
    console.log("SERVIDOR FUNCIONANDO NA PORTA " + process.env.SERVER_PORT);
});
express.use("/api", userRoutes);
