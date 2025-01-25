import { RequestHandler } from "express";
import { CourseModel } from "../modelos/courseModel";

const courses: CourseModel = require("../modelos/courseModel");

const getAllCourses: RequestHandler = async (request, response) => {
    const search = request.headers.search;
	console.log(request.body.user)
    const pipeline = [
        {
            $search: {
                index: "default",
                compound: {
                    should: [
                        {
                            autocomplete: {
                                query: search,
                                path: "subject",
                                fuzzy: {
                                    maxEdits: 2,
                                },
                            },
                        },
                    ],
                },
            },
        },
    ];

    await courses
        .then((maybeCourse) => {
            if (!search) {
                return maybeCourse?.find().toArray();
            }
            return maybeCourse?.aggregate(pipeline).toArray();
        })
        .then((dados) => {
            response.status(200).send(dados);
        })
        .catch((e) => {
            console.log(e);
            response.status(500).send("Erro");
        });
};
module.exports = { getAllCourses };
