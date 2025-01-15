import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../../../0-pre-req/rust/Turbine-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("4NJp9AzfaTkdZCD2DHpouqpg4nTn6QZBtLTQURmyK9SM");

// Recipient address
const to = new PublicKey("GaKuQyYqJKNy8nN9Xf6VmYJQXzQDvvUHHc8kTeGQLL3f");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const ataFrom = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey)

        // Get the token account of the toWallet address, and if it does not exist, create it
        const ataTo = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to)

        // Transfer the new token to the "toTokenAccount" we just created
        const tx = await transfer(connection, keypair, ataFrom.address, ataTo.address, keypair, 1e6) // 1e6 = 1 tokekn with 6 decimals

        console.log(`Transaction signature: ${tx}`)
        // 6v38EF64SwdRJJ4d6t98cD3uhnrEXsyHEX5GWy4CaEcfKFbbioR5aJ4pwYSa6QJotDSWC1ACDMYK6obQ7VdAARn
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();