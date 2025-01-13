import type { Application } from "express"
import {join} from "path"

const homedir = require("os").homedir()
const envPath = join(homedir+"/projetos/etec/TCC/server/.env")
require("dotenv").config({path:envPath})

const {docUI, servidorDoc} = require("./docs/swagger")
const userRoutes = require("./rotas/userRouter")

const express:Application = require("express")()
const jsonParser = require("express").json()

express.use(jsonParser)

express.listen(
	process.env.SERVER_PORT,
	() => {
		console.log("SERVIDOR FUNCIONANDO NA PORTA "+process.env.SERVER_PORT)
	}
)

express.use("/api", userRoutes)
express.use("/api-docs", servidorDoc, docUI)
