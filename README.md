# Wrapped Asset Bridge

Wrapped asset bridge allows bridging `ERC20` tokens and native gas tokens (e.g. `ETH`) from existing EVM chains (e.g. Ethereum, Avalanche, BSC, etc.) to subnets or brand new EVM chains where those assets do not exist natively. It supports mapping the same wrapped token to multiple tokens on other chains. E.g. moving native USDC from Ethereum or Avalanche to NewChainX will result in the same wrapped asset on NewChainX.


<br>


[badge-warning]: https://github.com/Mqxx/GitHub-Markdown/blob/main/blockquotes/badge/dark-theme/warning.svg 'Warning'

> ![badge-warning][badge-warning]<br>
> The bridge is not intended for bridging between existing L1 EVM chains (e.g. between Ethereum and Avalanche)

<br>

## Getting Started

### Setup

- Clone the repository
- run `yarn`

### Test

`yarn test`

Run the full suite of unit tests.

### Coverage

`yarn coverage`

Get the coverage report.

<br>

## Deploy and Register a new token

### Deploy

1. Copy `./contracts/wrappedTokens/USDC.sol` to `./contracts/wrappedTokens/NEW_CONTRACT_NAME.sol`
2. Rename the contract to the symbol of the token you want to deploy
3. Replace `WrappedERC20` constructor args (name, symbol, decimals)
4. Run the below command to deploy and verify on Etherlink

```
HARDHAT_NETWORK=etherlink npx hardhat deployWrappedToken --contract CONTRACT_NAME

// Example
HARDHAT_NETWORK=etherlink npx hardhat deployWrappedToken --contract DOGE

```

### Register

Run the below command to register the token with the wrapped asset bridge on both sides (Etherlink and other EVM)

```
npx hardhat registerToken \
    --original-network "ORIGINAL_NETWORK" \
    --original-token "ORIGINAL_TOKEN_ADDRESS" \
    --wrapped-token "ETHERLINK_TOKEN_ADDRESS"


// Example
npx hardhat registerToken \
    --original-network "base" \
    --original-token "0x6Bd593530f19119649A7eefC79E147CF0d4bFD49" \
    --wrapped-token "0x8F5034319aB049F149A31063862Df235Ca59a846" \
    --shared-decimals 18

```