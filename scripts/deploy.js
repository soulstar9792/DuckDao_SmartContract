async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    const balance = await deployer.getBalance();
    console.log("Account balance:", ethers.utils.formatEther(balance));

    const initialSupply = ethers.utils.parseEther("1000000"); // Adjust the supply as needed
    const DuckdaoToken = await ethers.getContractFactory("DuckdaoToken");
    const token = await DuckdaoToken.deploy(initialSupply);

    console.log("DuckdaoToken deployed to:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
