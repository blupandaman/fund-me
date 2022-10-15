import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert } from "chai";
import { utils } from "ethers";
import { ethers, network } from "hardhat";
import { FundMe } from "../../typechain-types";
import { developmentChains } from "./../../helper-hardhat-config";

developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", () => {
      let fundMe: FundMe;
      let deployer: SignerWithAddress;
      const sendValue = ethers.utils.parseEther("1");

      beforeEach(async () => {
        const accounts = await ethers.getSigners();
        deployer = accounts[0];
        fundMe = await ethers.getContract("FundMe", deployer.address);
      });

      it("Allows people to fund and withdraw", async () => {
        await fundMe.fund({ value: sendValue, gasLimit: 100000 });
        await fundMe.withdraw({
          gasLimit: 100000,
        });
        const endingFundMeBalance = await fundMe.provider.getBalance(
          fundMe.address
        );
        assert.equal(endingFundMeBalance.toString(), "0");
      });
    });
