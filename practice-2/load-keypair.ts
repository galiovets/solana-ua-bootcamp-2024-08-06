require("dotenv").config();
import { Keypair } from "@solana/web3.js";

const privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("add SECRET_KEY to .env");
  process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const keypair = Keypair.fromSecretKey(asArray);

console.log(`public key: ${keypair.publicKey.toBase58()}`);
