use anchor_lang::{prelude::*, system_program::{transfer, Transfer}};

declare_id!("G5XrK1ohfcszkjU2JM7WGbAY362U9YiWXYvMoY6NW5KG");

#[program]
pub mod anchor_vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.initialize(&ctx.bumps)
    }
}

// initialize saving the bumps, so you don't need to use compute to find them again
#[derive(Accounts)]
// <'info> is setting the lifetime
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    
    // #[account] just checks for the parameters of the account, init pda
    #[account(
        init,
        payer = signer, // paying rent
        space = VaultState::INIT_SPACE + 8, // space taken onchain, 8 = for the discriminator
        seeds = [b"state", signer.key().as_ref()], // link user to each vault (unique per user), and authorize user to the pda
        bump
    )]
    pub state: Account<'info, VaultState>,

    #[account(
        seeds=[b"vault", state.key().as_ref()],
        bump
    )]
    pub vault: SystemAccount<'info>, // Vault system account storing SOL, no need to init because it is system owner first, pass enough SOL

    pub system_program: Program<'info, System>,
}

impl<'info> Initialize<'info>{
    pub fn initialize(&mut self, bumps: &InitializeBumps) -> Result<()>{
        self.state.vault_bump = bumps.vault;
        self.state.state_bump = bumps.state;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Deposit<'info>{
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        seeds = [b"state", user.key().as_ref()],
        bump = state.state_bump
    )]
    pub state: Account<'info, VaultState>,

    #[account(
        // mutable because changing state
        mut,
        seeds = [b"vault", state.key().as_ref()],
        bump = state.vault_bump
    )]
    pub vault : SystemAccount<'info>,

    pub system_program: Program<'info, System>
}

impl<'info> Deposit<'info>{
    pub fn deposit(&mut self, amount: u64) -> Result<()>{
        // Cross-Program invocation, to interact with the system_program
        let cpi_program = self.system_program.to_account_info();
        let cpi_accounts= Transfer {
            from: self.user.to_account_info(),
            to: self.vault.to_account_info()
        };

        let cpi_ctx = CpiContext::new(cpi_program,cpi_accounts);

        transfer(cpi_ctx, amount)
    }
}

#[account]
#[derive(InitSpace)] //calculating space needed with 'InitSpace'
pub struct VaultState{
    // vault system account bump, pda system_program
    pub vault_bump: u8, // 1 Byte space
    // vault state bump, pda our own program
    pub state_bump: u8, // 1 Byte space
}

//33:44