import wallet from "../../../0-pre-req/rust/Turbine-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = 'https://devnet.irys.xyz/CiJLMkEUDPHjvYvvUXWEXcknov3QnxQ2hjiVJdeQXreE'
        const metadata = {
            name: "Dean's List v2 Devnet",
            symbol: "DL v2",
            description: "Init DL v2 Devnet",
            image,
            attributes: [
                { trait_type: 'premium', value: 'blyat' }
            ],
            properties: {
                files: [
                    {
                        type: "image/gif",
                        uri: image
                    },
                ]
            },
            // For royalties
            creators: []
        };
        const myUri = await umi.uploader.uploadJson(metadata)
        console.log("Your metadata URI: ", myUri);
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
