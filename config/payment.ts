import { join } from "path";
import { readFileSync } from "fs";
import { AxiosResponse } from "axios";

const homedir = require("os").homedir();
const envPath = join(homedir + "/projetos/etec/TCC/server/.env");
const certPath = join(
    homedir + "/projetos/etec/TCC/server/assets/certificado.p12",
);
require("dotenv").config({ path: envPath });

const axios = require("axios");
const https = require("https");

const certificado = readFileSync(certPath);

const credenciais = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
};
const data = JSON.stringify({ grant_type: "client_credentials" });
const data_credenciais = `${credenciais.client_id}:${credenciais.client_secret}`;

const auth = Buffer.from(data_credenciais).toString("base64");
console.log(auth);

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

let efiConnectionSingleton: object | undefined;

const efiConnectionFactory = async (recreate?: boolean) => {
    if (recreate || !efiConnectionSingleton ) {
        await axios(config)
            .then((res: AxiosResponse) => {
                efiConnectionSingleton = res.data;
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    return efiConnectionSingleton;
};

module.exports = efiConnectionFactory;
