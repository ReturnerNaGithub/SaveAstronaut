"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const sepolia = {
  chainId: 11155111,
  name: "Sepolia",
  currency: "SepoliaETH",
  explorerUrl: "https://sepolia.etherscan.io/",
  rpcUrl: "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
};

const fuji = {
  chainId: 43113,
  name: "Fuji",
  currency: "AVAX",
  explorerUrl: "https://testnet.snowtrace.io/",
  rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
};

const mumbai = {
  chainId: 80001,
  name: "Mumbai",
  currency: "MATIC",
  explorerUrl: "https://mumbai.polygonscan.com/",
  rpcUrl: "https://rpc-mumbai.maticvigil.com/",
};

// 3. Create modal
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet, sepolia, mumbai, fuji],
  projectId,
});

export function Web3ModalProvider({ children }) {
  return children;
}
