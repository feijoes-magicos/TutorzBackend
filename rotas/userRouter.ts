import type { IRouter } from "express";

const router: IRouter = require("express").Router();
const userController = require("../controladores/userController");

/**
 *@swagger
 *components:
 *  schemas:
 *      Usuario:
 *          type: object
 *          properties:
 *              nome_usuario:
 *                  type: string
 *                  description: Nome social do usuário
 *              CPF:
 *                  type: string
 *                  description: Cadastro único de Pessoa Física, requerido para emissões de certificados
 *              email:
 *                  type: string
 *                  description: Endereço eletrônico para consolidação das credenciais do usuário
 *              senha:
 *                  type: string
 *                  description: Palavra passe para consolidação das credenciais do usuário
 */

/**
    * @swagger
    * /user:
    *   post:
    *       summary: Tentativa de criação de usuário no banco de dados
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                   schema:
    *                       $ref: '#/components/schemas/Usuario'
    *       tags:
    *           - Autenticação
    *       responses:
    *           200:
    *               description: Objeto json com mensagem de feedback
    *               content:
    *                   application/json:
    *                       type: object
    *                       properties:
    *                           message:
    *                               type: string
    *                               description: Mensagem com confirmação da criação do usuário
    *           404:
    *               description: rota não encontrada
    *           500:
    *               description: Objeto json com mensagem de feedback
    *               content:
    *                   application/json:
    *                       type: object
    *                       properties:
    *                           message:
    *                               type: string
    *                               description: Mensagem com negação da criação do usuário
    *                           Error:
    *                               type: string
    *                               description: Nome do erro que falhou a resposta da chamada
    *       
    */
router.post("/user", userController.createUserRequestHandler);
module.exports = router;
