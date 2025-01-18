import { RequestHandler } from "express";
import { CourseModel } from "../modelos/courseModel";

const courses: CourseModel = require("../modelos/courseModel");

const getAllCourses: RequestHandler = async (request, response) => {
	await courses
		.then((maybeCourse) => maybeCourse?.find().toArray())
		.then((dados) => {
			response.status(200).send(dados);
		})
		.catch((e) => {
			console.log(e);
			response.status(500).send("Erro");
		});
};
module.exports = {getAllCourses}
