use anchor_lang::prelude::*;

#[account]
pub struct Marketplace{
    pub admin: Pubkey, //32 bytes
    pub fee: u16, //2 bytes
    pub bump: u8, //1 byte
    pub treasury_bump: u8, //1 byte
    pub reward_bump: u8, //1 byte
    pub name: String,
}

impl Space for Marketplace{
    const INIT_SPACE: usize = 8 + 32 + 2 + 1 + 1 + 1 + (32); //32 characters
}