require("dotenv").config();
import { getExplorerLink } from "@solana-developers/helpers";
import { Keypair, clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

const privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("add SECRET_KEY to .env");
  process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`my public key: ${sender.publicKey.toBase58()}`);

const tokenMintAccount = new PublicKey(
  "FVgqR12s25gzcJ7C2wftiuRqYsteTaLXqc8R8LQNeNm3"
);

const recepient = new PublicKey("HumUoHR67DymARhPXFnozi4hk96P18JAoNfqWiGEvgyi");

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  recepient
);

console.log(`token account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink(
  "address",
  tokenAccount.address.toBase58(),
  "devnet"
);

console.log(`created token account: ${link}`);
