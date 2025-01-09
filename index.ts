import type { Application } from "express"
import {join} from "path"

const homedir = require("os").homedir()
const envPath = join(homedir+"/projetos/etec/TCC/server/.env")
require("dotenv").config({path:envPath})

const express:Application = require("express")()
express.listen(
	process.env.SERVER_PORT,
	() => {
		console.log("SERVIDOR FUNCIONANDO NA PORTA "+process.env.SERVER_PORT)
	}
)

