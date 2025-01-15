# Class 2
## Agenda
- Metaplex
  - Metadata
  - Master Edition
  - Collections
- Find PDA
- Transfer SPL Tokens

## Metaplex
- Initially started as Solana Labs initiative
- open NFT protocol and tools to support it
  - Metaplex Metadata Standard
  - CandyMachine
  - Compressed NFTs

### Metaplex Token Standard
- NonFungible: Master edition
- FungibleAsset: No master & 0 decimals
- Fungible: token, master & atleast 1 decimal
- NonFungibleEdition: Edition account
- ProgrammableNonFungible: forces royalties

### Metadata Account
- can be set to mutable
- Creator array can be to obtain royalties
  - Marketplaces
  - Creators must sign to be one verified
- Collection NFTs can be used to group NFTs
- JSON standard
- ts library: `@metaplex-foundation/mpl-token-metadata`

### Master Edition
- Proof that a token is non-fungible
  - verifies mint account has Zero decimals
  - verifies that only 1 Token has been minted
- Transfers the mint authority and freeze authority to the master edition
- You can set the max supply
- If set > 1 you can use the master edition to mint sub editions of an NFT

### Collection
- Collections are just NFTs
  - Setting the CollectionDetails object
- Collection field in Metadata account
- Collection allways a authority to verify or unverify
- can be nested
- Collections should now be sized

### UMI Deepdive
- Modular framework javascript, tool for metaplex programs

docs: https://developers.metaplex.com/token-metadata/mint 