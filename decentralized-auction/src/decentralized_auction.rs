#![no_std]

multiversx_sc::imports!();

#[multiversx_sc::contract]
pub trait DecentralizedAuction {
    
    // Runs once when deployed
    #[init]
    fn init(&self, auction_deadline: u64) {
        self.deadline().set(auction_deadline);
    }

    // ==========================================
    // STORAGE MAPPERS
    // ==========================================
    #[view(getDeadline)]
    #[storage_mapper("deadline")]
    fn deadline(&self) -> SingleValueMapper<u64>;

    #[view(getHighestBidder)]
    #[storage_mapper("highestBidder")]
    fn highest_bidder(&self) -> SingleValueMapper<ManagedAddress>;

    #[view(getHighestBid)]
    #[storage_mapper("highestBid")]
    fn highest_bid(&self) -> SingleValueMapper<BigUint>;

    // ==========================================
    // ENDPOINTS
    // ==========================================
    #[endpoint]
    #[payable("EGLD")]
    fn bid(&self) {
        // 1. Time check (using #[allow(deprecated)] to silence the warning safely)
        #[allow(deprecated)]
        let current_time = self.blockchain().get_block_timestamp();
        require!(current_time < self.deadline().get(), "The auction has already ended!");

        // 2. Amount check
        let payment_amount = self.call_value().egld().clone_value();
        let current_highest_bid = self.highest_bid().get();
        require!(payment_amount > current_highest_bid, "Your bid must be higher than the current highest bid!");

        // 3. Auto-refund previous highest bidder
        if !self.highest_bidder().is_empty() {
            let previous_bidder = self.highest_bidder().get();
            self.send().direct_egld(&previous_bidder, &current_highest_bid);
        }

        // 4. Update winner
        let caller = self.blockchain().get_caller();
        self.highest_bidder().set(&caller);
        self.highest_bid().set(&payment_amount);
    }

    #[endpoint]
    fn end_auction(&self) {
        // 1. Time check
        #[allow(deprecated)]
        let current_time = self.blockchain().get_block_timestamp();
        require!(current_time >= self.deadline().get(), "The auction is not over yet!");

        // 2. Ensure there are bids
        require!(!self.highest_bidder().is_empty(), "No one bid on this auction!");

        // 3. Pay the seller
        let seller = self.blockchain().get_owner_address();
        let winning_amount = self.highest_bid().get();
        self.send().direct_egld(&seller, &winning_amount);

        // 4. Clear state for security
        self.highest_bid().clear();
        self.deadline().clear();
    }
}