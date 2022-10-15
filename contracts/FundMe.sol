// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

error FundMe__NotOwner();
error FundMe__NotEnoughEthSent();

/** @title A contract for crowd funding
 *  @author BluPandaMan
 *  @notice Same funding contract
 *  @dev This implements chainlink price feeds as our library
 */
contract FundMe {
  using PriceConverter for uint256;

  uint256 public constant MINIMUM_USD = 50 * 1e18;
  address private immutable i_owner;
  mapping(address => uint256) private s_addressToAmountFunded;
  address[] private s_funders;
  AggregatorV3Interface private s_priceFeed;

  modifier onlyOwner() {
    // require(msg.sender == i_owner, "Sender is not owner!");
    // updated revert for gas optimizations
    if (msg.sender != i_owner) {
      revert FundMe__NotOwner();
    }
    _;
  }

  constructor(address priceFeedAddress) {
    i_owner = msg.sender;
    s_priceFeed = AggregatorV3Interface(priceFeedAddress);
  }

  /** @notice This function funds this contract
   *  @dev This implements chainlink price feeds as our library
   */
  function fund() public payable {
    // want to be able to set a minimum fund amount in USD
    if (msg.value.getConversionRate(s_priceFeed) < MINIMUM_USD) {
      revert FundMe__NotEnoughEthSent();
    } // 1e18 = 1 ETH
    s_addressToAmountFunded[msg.sender] = msg.value;
    s_funders.push(msg.sender);
  }

  /** @notice This function withdraws funds from the contract
   *  @dev This implements onlyOwner
   */
  function withdraw() public payable onlyOwner {
    address[] memory funders = s_funders;
    for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
      address funder = funders[funderIndex];
      s_addressToAmountFunded[funder] = 0;
    }

    // reset an array
    s_funders = new address[](0);

    // withdraw funds
    (bool callSuccess, ) = i_owner.call{value: address(this).balance}("");
    require(callSuccess, "Failed to withdraw contract balance");
  }

  function getOwner() public view returns (address) {
    return i_owner;
  }

  function getFunder(uint256 index) public view returns (address) {
    return s_funders[index];
  }

  function getAddressToAmountFunded(address funder)
    public
    view
    returns (uint256)
  {
    return s_addressToAmountFunded[funder];
  }

  function getPriceFeed() public view returns (AggregatorV3Interface) {
    return s_priceFeed;
  }
}
