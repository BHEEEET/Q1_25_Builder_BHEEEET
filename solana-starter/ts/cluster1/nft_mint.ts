import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount, publicKey } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata, createMetadataAccountV3 } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../../../0-pre-req/rust/Turbine-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

// royalties: https://devnet.irys.xyz/FcLePckTJhjVaptLcSArUyE5BQ7Kt1W74ZM5CYD8md2v
// ROYAL : https://devnet.irys.xyz/6jwBq37ghaBjoGRJoAW9tJFE6ZaWPKhgxxAC3EvULvYV 
// https://explorer.solana.com/address/Ca5aAvAz8aGjBk1Hgu3mcAmuY7L6KYZ3GJNgAeJASVpF/metadata?cluster=devnet

(async () => {
    let tx = createNft(umi, {
        mint: mint,
        name: "Dean's List v2 Devnet #100 Royal",
        symbol: "DL v2",
        // pass metadata uri
        uri: "https://devnet.irys.xyz/5on6Xpg7V6km4VRKqS56MG6YQCn4UbBMgAdLjUNjtk63",
        sellerFeeBasisPoints: percentAmount(5),
        creators: [
                        { address: publicKey("GaKuQyYqJKNy8nN9Xf6VmYJQXzQDvvUHHc8kTeGQLL3f"), share: 50, verified: true},
                        { address: publicKey("9SuQHwj9p6GDZMusnmqfXovaHxd9z3bQQn8e85fA5ue1"), share: 50, verified: false }
                    ]
    })
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);
    
    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    // DL: https://explorer.solana.com/tx/4jE8cBCogbpFCQXNCrf5dBB5EyZgSm7px1ZwSbT1c9R195gCpCC6UYVTURsF2V5NgapzjCvqva33ZKJzFJTXDNSj?cluster=devnet
    // Royalties: https://explorer.solana.com/tx/4RGyAUdEsV8pYTFnHptdm4Mvm74aQhfycLGMrEhLrU3VAbh7PR88TE7uS346bx8SDspLhEgfbA8vsyCrghbzVqxX?cluster=devnet 

    console.log("Mint Address: ", mint.publicKey);
})();