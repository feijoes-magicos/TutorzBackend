import { IRouter } from "express";

const router:IRouter = require("express").Router()
const {getAllCourses} = require("../controladores/courseController")
const authentication = require("../middleware/authentication")

router.get("/courses", authentication, getAllCourses)

module.exports = router
