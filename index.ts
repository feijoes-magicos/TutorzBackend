import type { Application } from "express";
import { join } from "path";

const homedir = require("os").homedir();
const envPath = join(homedir + "/projetos/etec/TCC/server/.env");
require("dotenv").config({ path: envPath });


const userRoutes = require("./rotas/userRouter");
const authRoutes = require("./rotas/authRouter")
const courseRoutes = require("./rotas/courseRouter")

const express: Application = require("express")();
const jsonParser = require("express").json();

express.use(jsonParser);

express.listen(process.env.SERVER_PORT, () => {
    console.log("SERVIDOR FUNCIONANDO NA PORTA " + process.env.SERVER_PORT);
});

express.use("/api", userRoutes);
express.use("/api", authRoutes);
express.use("/api", courseRoutes);

const { docUI, servidorDoc } = require("./docs/swagger");
express.use("/api-docs", servidorDoc, docUI);
