# Decentralized Auction dApp (MultiversX)

## Overview
This project is a trustless, decentralized auction platform built on the MultiversX blockchain. It allows users to authenticate via the xPortal wallet and place bids using native EGLD. The application follows a "Thin Client / Thick Ledger" architecture, where all business logic, security validations, and state management are strictly enforced on-chain by a Rust smart contract.

* **Network:** MultiversX Devnet
* **Smart Contract:** Rust
* **Frontend:** React / `@multiversx/sdk-dapp`

## Smart Contract Architecture (The Source of Truth)
The smart contract acts as a deterministic state machine utilizing a **Check-Effects-Interactions** pattern to guarantee fund security and prevent re-entrancy.

### Key Endpoints
* `bid`: (Payable in EGLD). Validates the block timestamp against the auction deadline and ensures the submitted value is strictly greater than the current highest bid. If successful, it automatically refunds the previous highest bidder before updating the on-chain storage mappers.
* `end_auction`: Validates that the auction deadline has passed. It securely routes the winning bid funds to the contract owner's address and clears the contract state.

## Frontend & End-to-End Lifecycle
The user interface is built using the official MultiversX `mx-template-dapp` boilerplate to ensure secure wallet integration and global state management. 

**Note on UI Interaction:** To maintain stability and avoid dependency collisions within the pre-compiled React template, the dashboard is currently configured in a read-only state for the visual demonstration. 

However, the **end-to-end transaction lifecycle is fully functional**. Transaction serialization, cryptographic signing via the wallet provider, and on-chain execution were successfully mapped and validated using the contract's ABI. All transaction hashes and state changes can be independently verified on the MultiversX Devnet Explorer.

## How to Run Locally

### Prerequisites
* Node.js (v18+)
* MultiversX xPortal App or Web Wallet extension (configured to Devnet)

### Installation & Launch
1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd frontend
