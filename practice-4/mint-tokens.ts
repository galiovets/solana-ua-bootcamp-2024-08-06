require("dotenv").config();
import { getExplorerLink } from "@solana-developers/helpers";
import { Keypair, clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { mintTo } from "@solana/spl-token";

const privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("add SECRET_KEY to .env");
  process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`my public key: ${sender.publicKey.toBase58()}`);

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const tokenMintAccount = new PublicKey(
  "FVgqR12s25gzcJ7C2wftiuRqYsteTaLXqc8R8LQNeNm3"
);

const recepientAssociatedAccount = new PublicKey(
  "23m3WrGycCLKJqi5ynVJRC1XDYMNbGYQtmapCZjePHN8"
);

const transactionSignature = await mintTo(
  connection,
  sender,
  tokenMintAccount,
  recepientAssociatedAccount,
  sender,
  10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`It's a success! mint token transaction: ${link}`);
