"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web3_js_1 = require("@solana/web3.js");
var bs58_1 = require("bs58");
var dotenv = require("dotenv");
dotenv.config();
var privateKey = process.env.PRIVATE_KEY || "";
var secretKey = bs58_1.default.decode(privateKey);
var keypair = web3_js_1.Keypair.fromSecretKey(secretKey);
// Get the JSON representation
var keypairJson = {
    publicKey: keypair.publicKey.toBase58(),
    secretKey: Array.from(keypair.secretKey) // Convert the Uint8Array to a regular array
};
console.log("Public Key:", keypair.publicKey.toBase58());
console.log("Keypair JSON:", JSON.stringify(keypairJson, null, 2));
