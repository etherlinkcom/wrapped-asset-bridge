const { getConnectedWallet } = require("../utils/crossChainHelper")
const CHAIN_IDS = require("../constants/chainIds.json")

const bridgeAddresses = {
	"ethereum": "0x1f8E735f424B7A49A885571A2fA104E8C13C26c7",
	"arbitrum": "0x1f8E735f424B7A49A885571A2fA104E8C13C26c7",
	"bsc": "0x1f8E735f424B7A49A885571A2fA104E8C13C26c7",
	"avalanche": "0x1f8E735f424B7A49A885571A2fA104E8C13C26c7",
	"optimism": "0x1f8E735f424B7A49A885571A2fA104E8C13C26c7",
	"base": "0x1f8E735f424B7A49A885571A2fA104E8C13C26c7",
}
const etherlinkWrappedAssetBridgeAddress = "0x1f8E735f424B7A49A885571A2fA104E8C13C26c7"

const etherlinkWrappedTokenAddresses = {
	"WETH": "0xfc24f770F94edBca6D6f885E12d4317320BcB401",
	"WBNB": "0xaA40A1cc1561c584B675cbD12F1423A32E2a0d8C",
	"WAVAX": "0xe820995cD39B6E09EAa7e4e16337184b4A61B644",
	"USDC": "0x796Ea11Fa2dD751eD01b53C372fFDB4AAa8f00F9",
	"USDT": "0x2C03058C8AFC06713be23e58D2febC8337dbfE6A",
	"SHIB": "0xBBD1F50A212357067318a84179892684e1Ac5181",
	"WBTC": "0xbFc94CD2B1E55999Cfc7347a9313e88702B83d0F",
}


/*
	// BASE
	npx hardhat registerToken \
		--original-network "base" \
		--original-token "0x6Bd593530f19119649A7eefC79E147CF0d4bFD49" \
		--wrapped-token "0x8F5034319aB049F149A31063862Df235Ca59a846" \
		--shared-decimals 18


	taskArgs
		originalNetwork: string = network of the original network
		originalToken: string = address of the token on the original network
		wrappedToken: string = address of the token on Etherlink
		sharedDecimals: number = decimals of the token on the original network
*/
module.exports = async function (taskArgs, hre) {
	const originalNetwork = taskArgs.originalNetwork
	const originalTokenChainId = CHAIN_IDS[originalNetwork]
	const originalWallet = getConnectedWallet(hre, originalNetwork, 0)

	const originalTokenBridge = (await ethers.getContractFactory("OriginalTokenBridge")).attach(bridgeAddresses[originalNetwork]).connect(originalWallet)

	const wrappedNetworkWallet = getConnectedWallet(hre, "etherlink", 0)
	const wrappedTokenBridge = (await ethers.getContractFactory("WrappedTokenBridge")).attach(etherlinkWrappedAssetBridgeAddress).connect(wrappedNetworkWallet)

	console.log(`\n[${originalNetwork}] OriginalTokenBridge at ${originalTokenBridge.address} calling registerToken(${taskArgs.originalToken})`)
	await originalTokenBridge.registerToken(taskArgs.originalToken.toString(), Number(taskArgs.sharedDecimals))

	console.log(`\n[Etherlink] WrappedTokenBridge at ${wrappedTokenBridge.address} calling registerToken(${taskArgs.wrappedToken}, ${originalTokenChainId}, ${taskArgs.originalToken})`)
	await wrappedTokenBridge.registerToken(taskArgs.wrappedToken.toString(), originalTokenChainId, taskArgs.originalToken.toString())
}