"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const { createToken } = require("../controladores/authController");
router.post("/login", createToken);
module.exports = router;
