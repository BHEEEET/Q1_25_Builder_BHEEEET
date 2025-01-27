use anchor_lang::prelude::*;
use anchor_spl::{self, associated_token::AssociatedToken, token_interface::{TokenAccount, TokenInterface}};

#[derive(Accounts)]
pub struct Make<'info>{
    #[account(mut)]
    pub maker: Signer<'info>,
    pub mint_a: InterfaceAccount<'info, Mint>,
    pub mint_b: InterfaceAccount<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = mint_a,
        associated_token::authority = maker,
    )]
    pub maker_ata_a: InterfaceAccount<'info, TokenAccount>,

    #[account(
        init,
        payer = maker,
        seeds = [b"escrow", maker.key().as_ref(), seed.to_le_bytes().as_ref()],
        bump,
        space = 8 + Escrow::INIT_SPACE,
    )]
    pub escrow: Account<'info, Escrow>,

    pub associated_token_program: Program<'info, AssociatedToken>,

    // TokenInterface supports spl and token22
    pub token_program: Interface<'info, TokenInterface>,

    pub system_program: Program<'info, System>,
}