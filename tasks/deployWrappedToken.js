// const { ethers } = require("hardhat")
const { getConnectedWallet } = require("../utils/crossChainHelper")

const etherlinkWrappedAssetBridgeAddress = "0x1f8E735f424B7A49A885571A2fA104E8C13C26c7"

/*
	HARDHAT_NETWORK=etherlink npx hardhat deployWrappedToken --contract DOGE

	taskArgs
	contract: string = contract name to be deployed
*/
module.exports = async function (taskArgs, hre) {
	await hre.run('compile')

	const etherlinkWallet = getConnectedWallet(hre, "etherlink", 0)
	const contract = taskArgs.contract.toString()

	const WrappedTokenContract = await ethers.getContractFactory(contract, etherlinkWallet)
	const wrappedTokenContract = await WrappedTokenContract.deploy(etherlinkWrappedAssetBridgeAddress)

	await wrappedTokenContract.deployTransaction.wait();

	console.log(`\nDeployed ${taskArgs.contract} at ${wrappedTokenContract.address}\n`)

	await hre.run("verify:verify", {
		address: wrappedTokenContract.address,
		constructorArguments: [etherlinkWrappedAssetBridgeAddress],
		contract: `contracts/wrappedTokens/${contract}.sol:${contract}`
	  });
}


