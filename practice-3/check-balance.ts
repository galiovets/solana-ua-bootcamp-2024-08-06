require("dotenv").config();
const {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} = require("@solana/web3.js");

const connection = new Connection(clusterApiUrl("devnet"));
console.log("connected to devnet");

const publicKey = new PublicKey("HumUoHR67DymARhPXFnozi4hk96P18JAoNfqWiGEvgyi");
const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `💰 The balance for the wallet at address ${publicKey} is: ${balanceInSOL}`
);
