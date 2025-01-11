"use strict";
const jsonwebtoken = require("jsonwebtoken");
const token = jsonwebtoken.sign({ foo: "teste" }, "macarrão");
const verificacao = jsonwebtoken.verify(token, "macarrão");
console.log(token);
console.log(verificacao);
