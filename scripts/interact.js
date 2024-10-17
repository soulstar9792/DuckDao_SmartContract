const hre = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners();

    // Provide the deployed contract address here
    const contractAddress = "0xYourDeployedContractAddress";  // Replace with actual deployed address

    // Fetch the deployed contract
    const DuckdaoToken = await hre.ethers.getContractAt("DuckdaoToken", contractAddress);

    // Call a contract function, e.g., minting tokens
    const mintAmount = ethers.utils.parseEther("1000");
    const tx = await DuckdaoToken.mint(owner.address, mintAmount);
    console.log("Minted 1000 tokens to:", owner.address);

    // Wait for the transaction to be mined
    await tx.wait();

    // Check the new balance
    const balance = await DuckdaoToken.balanceOf(owner.address);
    console.log("Owner's balance after minting:", ethers.utils.formatEther(balance));
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
