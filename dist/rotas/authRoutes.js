"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const { createToken } = require("../controladores/authController");
/**
    * @swagger
    * /login:
    *   post:
    *       summary: Tenta autenticar o usuário e retornar um token válido
    *       requestBody:
    *           required: true
    *           schema:
    *               type: object
    *               properties:
    *                   email:
    *                       type: string
    *                       description: Endereço eletrônico do usuário
    *                   senha:
    *                       type: string
    *                       description: Palavra-passe do usuário
    *       responses:
    *           200:
    *               description: retorn um objeto com informaçõs de autenticação
    *               content:
    *                   application/json:
    *                       schema:
    *                           type: object
    *                           properties:
    *                               usuario:
    *                                   type: string
    *                                   description: Nome social do usuário
    *                               token:
    *                                   type: string
    *                                   description: Token de autenticação
    *
    */
router.post("/login", createToken);
module.exports = router;
