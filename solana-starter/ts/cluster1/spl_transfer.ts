import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../../../0-pre-req/rust/Turbine-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("59ZWt7yfcJbD3oVePgxe9PNRX7Zp4KP9Tvb6rK8swbDu");

// Recipient address
const to = new PublicKey("BvhV49WPYBbzPu8Fpy8YnPnwhNWLbm9Vmdj2T5bNSotS");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const ataFrom = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey)

        // Get the token account of the toWallet address, and if it does not exist, create it
        const ataTo = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to)

        // Transfer the new token to the "toTokenAccount" we just created
        const tx = await transfer(connection, keypair, ataFrom.address, ataTo.address, keypair, 1) // 1e6 = 1 tokekn with 6 decimals

        console.log(`Transaction signature: ${tx}`)
        // 6v38EF64SwdRJJ4d6t98cD3uhnrEXsyHEX5GWy4CaEcfKFbbioR5aJ4pwYSa6QJotDSWC1ACDMYK6obQ7VdAARn

        // NFT Sent to Jeff https://explorer.solana.com/tx/2ALbk2fuSjJQBX4YV6xYxSMU4ivbR6RPacL7r7KySzKQJ5Hh8zjHPwmLSWHKQFneQgaqcGPj5fCVkigFqgtEoNeJ?cluster=devnet
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();