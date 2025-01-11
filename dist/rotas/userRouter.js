"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const userController = require("../controladores/userController");
router.post("/user", userController.createUserRequestHandler);
module.exports = router;
