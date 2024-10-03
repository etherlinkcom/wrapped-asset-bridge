const { ethers } = require("hardhat")

const etherlinkWrappedAssetBridgeAddress = "0x1f8E735f424B7A49A885571A2fA104E8C13C26c7"

module.exports = async function (taskArgs, hre) {
	await hre.run('compile')

	const etherlinkWallet = getConnectedWallet(hre, "etherlink", walletIndex)

	const WrappedTokenContract = await ethers.getContractFactory(taskArgs.contractName, etherlinkWallet)
	const wrappedTokenContract = await WrappedTokenContract.deploy(etherlinkWrappedAssetBridgeAddress)
	console.log(`\nDeployed ${taskArgs.contractName} at ${wrappedTokenContract.address}\n`)
}
