import { IRouter } from "express";

const router: IRouter = require("express").Router();
const { getAllCourses } = require("../controladores/courseController");
const authentication = require("../middleware/authentication");

/**
 *@swagger
 *components:
 *  schemas:
 *      Cursos:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: identificador do curso
 *              nameCourse:
 *                  type: string
 *                  description: nome do curso
 *              description:
 *                  type: string
 *                  description: pequena descrição sobre o curso
 *              rating:
 *                  type: number
 *                  description: número de ponto flutuante que reflete
 *              totalSubscribers:
 *                  type: number
 *                  description: total de assinantes do curso
 *              modules:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          nameModule:
 *                              type: string
 *                              description: nome do módulo
 *                          description:
 *                              type: string
 *                              description: descrição do módulo
 *                          aproxTimeMinutes:
 *                              type: number
 *                              description: estimativa de finalização
 *              tutorID:
 *                  type: string
 *                  description: referencia para a coleção de tutores
 */

/**
 * @swagger
 * /courses:
 *   get:
 *       tags:
 *           - Cursos
 *       summary: Retorna cursos ao usuário
 *       security:
 *           - BearerAuth: []
 *       responses:
 *           200:
 *               description: Retorna os cursos para uso local
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: array
 *                           items:
 *                              $ref: "#/components/schemas/Cursos"
 *
 *           401:
 *               description: Falha na autenticação da requisição
 *               content:
 *                   text/plain:
 *                       description: Retorno de erro de autenticação
 *
 */
router.get("/courses", authentication, getAllCourses);

module.exports = router;
