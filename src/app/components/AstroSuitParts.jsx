"use client";
import React, { useEffect, useState } from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { SourceMinter, AstroSuitPartsNFT } from "../../artifacts/artifacts";

const AstroSuitParts = () => {
  const [astroSuitPartsNFTContract, setAstroSuitPartsNFTContract] =
    useState(null);
  const [balances, setBalances] = useState([]);
  const [metadatas, setMetadatas] = useState([]);

  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected, address } = useWeb3ModalAccount();

  const getAstroSuitPartsNFTContract = async (walletProvider) => {
    try {
      const provider = new BrowserProvider(walletProvider);
      //   console.log(provider);
      const signer = await provider.getSigner();
      //   console.log(signer);
      const astroSuitPartsNFT = new Contract(
        AstroSuitPartsNFT.address,
        AstroSuitPartsNFT.abi,
        signer
      );
      console.log(astroSuitPartsNFT.target);
      setAstroSuitPartsNFTContract(astroSuitPartsNFT);
      // return astroSuitPartsNFT;
    } catch (error) {
      console.log(error);
    }
  };

  const getAstroSuitPartsTokenBalances = async (address) => {
    try {
      console.log("hello");
      const uris = await astroSuitPartsNFTContract.balanceOfBatch(
        [address, address, address, address],
        [0, 1, 2, 3]
      );
      setBalances((balances) => [...balances, uris]);
      console.log(uris[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getAstroSuitPartsTokenURIS = async (tokenId) => {
    try {
      //   console.log("hello");
      const uri = await astroSuitPartsNFTContract.tokenURI(tokenId);

      console.log(uri);
      const response = await (await fetch(uri)).json();
      console.log(await response.json());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (walletProvider && isConnected) {
      getAstroSuitPartsNFTContract(walletProvider);
    }
    console.log(walletProvider, isConnected);
  }, []);

  useEffect(() => {
    if (address && astroSuitPartsNFTContract) {
      getAstroSuitPartsTokenBalances(address);
    }
  }, [astroSuitPartsNFTContract]);

  useEffect(() => {
    if (address && astroSuitPartsNFTContract && balances) {
      balances.map(async (balance, idx) => {
        return await getAstroSuitPartsTokenURIS(idx);
      });
    }
  }, [balances]);

  return <div>AstroSuitParts</div>;
};

export default AstroSuitParts;
