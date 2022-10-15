export interface networkConfigInfo {
  [key: string]: {
    ethUsdPriceFeed?: string;
    blockConfirmations?: number;
  };
}

export const networkConfig: networkConfigInfo = {
  goerli: {
    ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    blockConfirmations: 6,
  },
  arbitrumGoerli: {
    ethUsdPriceFeed: "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
    blockConfirmations: 6,
  },
};

export const developmentChains = ["hardhat", "localhost"];

export const DECIMALS = 8;

export const INITIAL_ANSWER = 200000000000;
