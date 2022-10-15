import { ethers, network } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  DECIMALS,
  developmentChains,
  INITIAL_ANSWER,
} from "./../helper-hardhat-config";

const deployMocks: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { deploy, log } = deployments;
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];

  if (developmentChains.includes(network.name)) {
    log("Local netword detected. Deploying mocks...");
    await deploy("MockV3Aggregator", {
      from: deployer.address,
      log: true,
      args: [DECIMALS, INITIAL_ANSWER],
    });
    log("Mocks deployed successfully");
    log("-----------------------------------------------------");
  }
};

export default deployMocks;
deployMocks.tags = ["all", "mocks"];
