# Foresta Node Documentation

![Foresta Banner](media/foresta-banner.png)

**An enterprise-level carbon-credit issuance and retiring platform.** Foresta aims to streamline the process of carbon credit generation, verification, and retirement with a focus on transparency and efficiency.

🌍 [Website](https://www.foresta.network) |

## Overview

Foresta Node provides the technological foundation for the Foresta Protocol, a decentralized platform designed to support carbon credit issuance and retirement processes at an enterprise level. It leverages blockchain technology to ensure the integrity, transparency, and security of carbon credit transactions.

## Features

- **Carbon Credit Management:** Efficient handling of carbon credit issuance, trading, and retirement.
- **KYC Integration:** Ensures compliance with global standards through a Know Your Customer (KYC) framework.
- **Decentralized Finance (DeFi) Components:** Incorporates DeFi features such as pools and decentralized exchanges (DEX) for carbon credit trading.
- **Governance:** Facilitates community governance through Foresta Collectives, enabling proposal submission and voting.
- **DEX:** Buying, selling and retiring carbon credits allocating payments from authorities as collective managers to collective members.

## Quick Start

### Requirements

- Substrate development environment setup.
- Rust and Cargo installed.
- Git for code repository cloning.

### Installation

1. Clone the Foresta node repository:

    ```bash
    https
    git clone https://github.com/foresta-network/Foresta-PoC
    ssh [recommended]
    git clone git@github.com:foresta-network/Foresta-PoC.git
    cd foresta-node
    ```

2. Build the node (The first build might take up to 30 minutes depending on your machine's specifications):

    ```bash
    cargo build -p container-chain-template-simple-node --release
    ```

### Running the Node

1. Run the node in development mode with sealing enabled:

    ```bash
    ./target/release/container-chain-template-simple-node --dev --sealing 6000
    ```

2. Access the node and perform operations using the Polkadot.js.org/apps interface. Set the interface to connect to your local development node.

## Pallet Information

- **KYC, Carbon Credits, and Collectives Pallets:** Manage KYC processes, carbon credit issuance, trading, and collective governance.
- **Runtime Architecture:** Incorporates essential pallets for token balances, transaction payment management, authorship, and session handling.
- **Container-chain Template:** Uses a simple template for basic operations, focusing on scalability and interoperability.

## Funding Accounts

Ensure the following pallet accounts are funded upon node initialization for seamless operation:

- **DEX:** `5EYCAe5fvJMpFoTxRjUDmf4VvqJcpBTDEiD9Jg86JVWFB4Xm`
- **CarbonCredits:** `5EYCAe5fvJMpFobCKxFM9kjhoVwcYByEnDDWk36syUXiPdfM`
- **CarbonCreditsPool:** `5EYCAe5fvJMgizZc3hWRWmrEAaho3gA6ZnqX3AV72HGyJkAB`
- **KYC:** `5EYCAe5fvJMpFoWocGiiFrUTvzMXNBRccpYvNyuUGJyMcamb`
- **ForestaCollectives:** `5EYCAe5gj4MWc3L9QTJ8eRm96L356AknQ8Pi1TNjqAjGqFKF`

## Running local node

After funding the accounts, ensure to assign KYC, Carbon Credit authorities in order to start using the extrinsic functionalities from Sudo.
