import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../../../0-pre-req/rust/Turbine-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    let tx = createNft(umi, {
        mint: mint,
        name: "Dean's List v2 Devnet #2",
        symbol: "DL v2",
        // pass metadata uri
        uri: "https://devnet.irys.xyz/C445XKtAx5kUgRPmpjzToMKhT8yCfub2pfKmo9Ru21mb",
        sellerFeeBasisPoints: percentAmount(5),
    })
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);
    
    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
    // https://explorer.solana.com/tx/4jE8cBCogbpFCQXNCrf5dBB5EyZgSm7px1ZwSbT1c9R195gCpCC6UYVTURsF2V5NgapzjCvqva33ZKJzFJTXDNSj?cluster=devnet

    console.log("Mint Address: ", mint.publicKey);
})();