import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];
  const fundMe = await ethers.getContract("FundMe", deployer);
  const sendValue = ethers.utils.parseEther("1");

  console.log("Funding contract...");
  const txResponse = await fundMe.fund({ value: sendValue });
  await txResponse.wait(1);
  console.log("Funded");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
