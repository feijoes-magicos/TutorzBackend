"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const { getAllCourses } = require("../controladores/courseController");
const authentication = require("../middleware/authentication");
router.get("/courses", authentication, getAllCourses);
module.exports = router;
