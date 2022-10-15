import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];
  const fundMe = await ethers.getContract("FundMe", deployer);
  const sendValue = ethers.utils.parseEther("1");

  console.log("Withdrawing from contract...");
  const txResponse = await fundMe.withdraw();
  await txResponse.wait(1);
  console.log("Funds withdrawn");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
