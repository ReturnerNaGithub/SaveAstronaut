"use client";
import React, { useEffect, useState } from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useWeb3Modal,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { AstroSuitFullNFT } from "../../artifacts/artifacts";
import Loader from "./Loader";
import FullCard from "./FullCard";

const AstroSuitFull = () => {
  const [astroSuitFullNFTContract, setAstroSuitFullNFTContract] =
    useState(null);
  const [balance, setBalance] = useState(0);
  const [image, setImage] = useState("");
  const [chain, setChain] = useState(0);
  const [txnInProgress, setTxnInProgress] = useState(false);

  const { open } = useWeb3Modal();
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected, address, chainId } = useWeb3ModalAccount();

  useEffect(() => {
    setChain(chainId);
  }, [chainId]);

  const getAstroSuitFullNFTContract = async (walletProvider) => {
    try {
      const provider = new BrowserProvider(walletProvider);
      //   console.log(provider);
      const signer = await provider.getSigner();
      //   console.log(signer);
      const astroSuitFullNFT = new Contract(
        AstroSuitFullNFT.address,
        AstroSuitFullNFT.abi,
        signer
      );
      console.log(astroSuitFullNFT.target);
      setAstroSuitFullNFTContract(astroSuitFullNFT);
      // return astroSuitPartsNFT;
    } catch (error) {
      console.log(error);
    }
  };

  const getAstroSuitBalancesAndMetadata = async (address) => {
    // const metadataAndBalancesArray = [];
    try {
      console.log("hello");
      const fetchedBalance = await astroSuitFullNFTContract.balanceOf(address);
      // setBalances((balances) => [...balances, fetchedBalances]);
      console.log(fetchedBalance);
      setBalance(Number(fetchedBalance));

      const uri = await astroSuitFullNFTContract.tokenURI(0);
      const res = await (await fetch(uri)).json();
      setImage((await res).image);
      console.log((await res).image);

      // console.log(metadataAndBalancesArray);
    } catch (error) {
      console.log(error);
    } finally {
      // console.log(metadataAndBalancesArray);
    }
  };

  useEffect(() => {
    if (walletProvider && isConnected && chain === 80001) {
      getAstroSuitFullNFTContract(walletProvider);
    }
    console.log(walletProvider, isConnected);
  }, [walletProvider, chain]);

  useEffect(() => {
    if (address && astroSuitFullNFTContract && isConnected) {
      getAstroSuitBalancesAndMetadata(address);
      console.log(balance);
    }
  }, [astroSuitFullNFTContract]);

  return (
    <div>
      {txnInProgress && <Loader />}
      <h2 className="text-4xl font-bold text-white mb-4 mt-20">
        AstroSuitFull NFT
      </h2>
      {chain === 80001 ? (
        <FullCard _id={0} photo={image} balance={balance} address={address} />
      ) : (
        <button
          className="text-white bg-emerald-600 font-medium rounded-md text-md w-full sm:w-auto px-3 py-1.5 text-center my-12"
          onClick={() => {
            open({ view: "Networks" });
          }}
        >
          Switch to Mumbai Testnet to view content
        </button>
      )}
    </div>
  );
};

export default AstroSuitFull;
