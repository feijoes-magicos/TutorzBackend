import { IRouter } from "express"
const router:IRouter = require('express').Router()
const {createToken} = require("../controladores/authController")

router.post("/login", createToken)

module.exports = router
