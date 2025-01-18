"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const { getAllCourses } = require("../controladores/courseController");
router.get("/courses", getAllCourses);
module.exports = router;
