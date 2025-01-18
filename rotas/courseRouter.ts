import { IRouter } from "express";

const router:IRouter = require("express").Router()
const {getAllCourses} = require("../controladores/courseController")

router.get("/courses", getAllCourses)

module.exports = router
