"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const courses = require("../modelos/courseModel");
const getAllCourses = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const search = request.headers.search;
    console.log(request.body.user);
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
    yield courses
        .then((maybeCourse) => {
        if (!search) {
            return maybeCourse === null || maybeCourse === void 0 ? void 0 : maybeCourse.find().toArray();
        }
        return maybeCourse === null || maybeCourse === void 0 ? void 0 : maybeCourse.aggregate(pipeline).toArray();
    })
        .then((dados) => {
        response.status(200).send(dados);
    })
        .catch((e) => {
        console.log(e);
        response.status(500).send("Erro");
    });
});
module.exports = { getAllCourses };
