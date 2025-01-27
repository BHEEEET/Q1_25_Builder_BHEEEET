use anchor_lang::prelude::*;

declare_id!("41qgvkHGcNozGUuEqyAvV7dF1DZKqAdrw6oJ9pePVuXe");

mod instructions;
mod state;

#[program]
pub mod escrow {
    use super::*;

    pub fn initialize(ctx: Context<Make>) -> Result<()> {
        Ok(())
    }
}

// 40:34