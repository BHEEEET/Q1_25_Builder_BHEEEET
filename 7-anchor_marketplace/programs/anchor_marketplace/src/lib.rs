use anchor_lang::prelude::*;

declare_id!("3KBNzCTBNQH7FjDne59D6cmfkLuQsp4i5BM7as1F7dA6");

mod context;
mod state;
mod errors;
use context::*;
use errors::*;
use state::*;

#[program]
pub mod anchor_marketplace {
    use super::*;

    pub fn initialize(mut ctx: Context<Initialize>, name: String,fee: u16) -> Result<()> {
        ctx.accounts.initialize(name, fee, &ctx.bumps)?;
        Ok(())
    }

    pub fn listing(ctx: Context<List>) -> Result<()> {
        Ok(())
    }

    pub fn delist(ctx: Context<Delist>) -> Result<()> {
        Ok(())
    }

    pub fn purchase(ctx: Context<Purchase>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
