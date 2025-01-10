import { Keypair, Connection, clusterApiUrl, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";

import bs58 from 'bs58';
import * as dotenv from "dotenv";
dotenv.config();

const privateKey = process.env.PRIVATE_KEY || ""; 

const secretKey = bs58.decode(privateKey);

const keypair = Keypair.fromSecretKey(secretKey);

// Get the JSON representation
const keypairJson = {
    publicKey: keypair.publicKey.toBase58(),
    secretKey: Array.from(keypair.secretKey) // Convert the Uint8Array to a regular array
};

console.log("Public Key:", keypair.publicKey.toBase58());
console.log("Keypair JSON:", JSON.stringify(keypairJson, null, 2));
