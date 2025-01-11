import type { IRouter } from "express";

const router:IRouter = require("express").Router()
const userController = require("../controladores/userController")

router.post("/user", userController.createUserRequestHandler)
module.exports = router

