import { RequestHandler } from "express";
import { Collection, MongoClient } from "mongodb";

type Course = {
	_id: string;
	nameCourse: string;
	description: string;
	rating: number;
	totalSubscribers: number
	modules: Array<object>;
	tutorID: string;
};

const AtlasFactory: Promise<MongoClient | undefined> = new Promise(
	(resolve, reject) => {
		const { AtlasFactory } = require("../config/databaseConfig");
		if (AtlasFactory) {
			resolve(AtlasFactory());
		}
		reject(new Error("Falha na conexão com o MongoDB"));
	},
);

const courseModel = (async () => {
	const collection: Collection<Course> | undefined = await AtlasFactory.then(
		(instancia) => {
			if (instancia instanceof MongoClient) {
				return instancia.db("Main").collection<Course>("courses");
			}
		},
	).catch((e) => {
		console.error(e);
		return undefined;
	});
	return collection;
})();

module.exports = courseModel
