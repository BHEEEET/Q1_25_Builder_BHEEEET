use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::TokenAccount;
use anchor_spl::token_interface::{Mint, TokenInterface};
use anchor_spl::metadata::{MasterEditionAccount, MetadataAccount};

use crate::state::listing::Listing;
use crate::state::marketplace::Marketplace;

pub struct List<'info>{
    #[account(mut)]
    pub maker: Signer<'info>,

    pub marketplace: Account<'info, Marketplace>,
    pub maket_mint: Interface<'info, Mint>,
    pub maker_mint_ata: InterfaceAccount<'info, Mint>,
    pub metadata: Account<'info, Metadata>,
    pub vault: Interface<'info, TokenAccount>,
    pub listing: Account<'info, Listing>,
    pub collection_mint: InterfaceAccount<'info, Mint>,
    pub master_edition: Account<'info, MasterEdition>,
    pub metadata_program: Program<'info, Metadata>
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>
}