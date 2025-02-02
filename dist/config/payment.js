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
const path_1 = require("path");
const fs_1 = require("fs");
const homedir = require("os").homedir();
const envPath = (0, path_1.join)(homedir + "/projetos/etec/TCC/server/.env");
const certPath = (0, path_1.join)(homedir + "/projetos/etec/TCC/server/assets/certificado.p12");
require("dotenv").config({ path: envPath });
const axios = require("axios");
const https = require("https");
const certificado = (0, fs_1.readFileSync)(certPath);
const credenciais = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
};
const data = JSON.stringify({ grant_type: "client_credentials" });
const data_credenciais = `${credenciais.client_id}:${credenciais.client_secret}`;
const auth = Buffer.from(data_credenciais).toString("base64");
const agent = new https.Agent({
    pfx: certificado,
    passphrase: "",
});
const config = {
    method: "POST",
    url: "https://pix-h.api.efipay.com.br/oauth/token",
    headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
    },
    data: data,
    httpsAgent: agent,
};
let efiConnectionSingleton;
const efiConnectionFactory = (recreate) => __awaiter(void 0, void 0, void 0, function* () {
    if (recreate || !efiConnectionSingleton) {
        yield axios(config)
            .then((res) => {
            efiConnectionSingleton = res.data;
        })
            .catch((e) => {
            console.log(e);
        });
    }
    return efiConnectionSingleton;
});
module.exports = efiConnectionFactory;
