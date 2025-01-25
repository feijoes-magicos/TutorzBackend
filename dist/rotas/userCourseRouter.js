"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const authentication = require("../middleware/authentication");
const { getCoursesByID } = require("../controladores/userCourseController");
/**
 *@swagger
 *components:
 *  schemas:
 *      UserCourse:
 *          type: object
 *          properties:
 *              cod_usuario:
 *                  type: number
 *                  description: Chave Primária do usuário
 *              cod_curso:
 *                  type: string
 *                  description: Chave Primária do curso
 *              progresso:
 *                  type: number
 *                  description: registro do progresso do usuário
 */
/**
 * @swagger
 * /usercourse:
 *  get:
 *      security:
 *          - BearerAuth: []
 *      summary: Retorna os cursos assinados pelo usuário
 *      tags:
 *          - UsuarioCursos
 *      responses:
 *          200:
 *              description: Objeto json com mensagem de feedback e os dados
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: "#/components/schemas/UserCourse"
 *          500:
 *              description: Objeto json com mensagem de feedback
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Mensagem com negação da criação do usuário
 *                              Error:
 *                                  type: string
 *                                  description: Nome do erro que falhou a resposta da chamada
 */
router.get("/usercourse", authentication, getCoursesByID);
module.exports = router;
