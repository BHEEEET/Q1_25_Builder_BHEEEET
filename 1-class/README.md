# Class 1
## toolbox
- rust
- nodejs
- yarn
- solanacli
- anchor version manager
- rustanalyzer
- even better toml
- error lens

## Agenda
- Accounts
- Programs
- Rent
- transactions
- Compute
- IDL
- PDA
- SPL Token

## Accounts
- Everything is a account
- Programs are executable
- Wallets are not executable
- space is dynamic
- rent needs to be paid for space
- Can only be created by System program

## Programs
- marked as executable
- stateless
- owned by loaders, by default Upradeable loader is used
- ability to own ohter non-executable accounts
- programid
- Native programs provided by Solana
- User programs, by us

## Rent
- pay rent to create account
- pay 2 years up-front for rent-exemption
- rent-exemption is required on account creation
- closing an accounts allow rent to be reclaimed
- resizing cost more rent or less
- upgradable programs require 4 years up-front payment

## Transactions
- Must include all the accounts that the transaction will reference
- One or more instructions
- atomic, if one instuctions fails, the trasnaction fails

## Compute
- all on-chain actions require compute units
- Solana has maximum number of compute units per block
- You can request extre compute units
  - Does not necessarily require paying a higher fee

## PDA
- Made up of seeds and a bump
- no collisions of addresses
- can be used as hashmpa
- don't have private key
- can sign on behalf of a program

## IDL
- Interface Design Language
- Many on-chain programs have an IDL
- makes interecating with on-chain programs much easier
- public IDLs can be uploaded to the blockahin for accessilblity
- JSON

## SPL-token
- when creating new SPL token, you must create a mint account
  - Mint authority
  - Freeze authority
  - decimals
- The spl-token library provides function called `createMint`
- After mint, we can create Token Accounts
  - keeps track of token balance
  - linked to single mint account

## Associated Token Account
- one of the most used PDAs on Solana
- Create a deterministic token account
- Other people can create token accounts for you

```
- PDA
- Mint Account
- Token Account
  - ATA (Associated Token Account)
```

## Coding
- `createMint()` from `@solana/spl-token`
- `getOrCreateAssociatedTokenAcount()` from `@solana/spl-token`
- `mintTo()` from `@solana/spl-token`