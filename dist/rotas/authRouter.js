"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const { createToken } = require("../controladores/authController");
/**
    * @swagger
    * /login:
    *   post:
    *       tags:
    *           - Autenticação
    *       summary: Tenta autenticar o usuário e retornar um token válido
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                   schema:
    *                       type: object
    *                       properties:
    *                           email:
    *                               type: string
    *                               description: Endereço eletrônico do usuário
    *                           senha:
    *                               type: string
    *                               description: Palavra-passe do usuário
    *       responses:
    *           200:
    *               description: retorna um objeto com informações de autenticação
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
    *           404:
    *               description: rota não encontrada
    *           500:
    *               description: retorna um objeto com informações sobre erro
    *               content:
    *                   application/json:
    *                       schema:
    *                           type: object
    *                           properties:
    *                               message:
    *                                   type: string
    *                                   description: texto informando a falha da criação de usuario
    *                               Error:
    *                                   type: string
    *                                   description: Nome do erro/excessão ou erro desconhecido
    *
    */
router.post("/login", createToken);
module.exports = router;
