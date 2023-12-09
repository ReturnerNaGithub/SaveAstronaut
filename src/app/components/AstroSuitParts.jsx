"use client";
import React, { useEffect, useState } from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useWeb3Modal,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { SourceMinter, AstroSuitPartsNFT } from "../../artifacts/artifacts";
import Card from "./Card";
import Loader from "./Loader";

const AstroSuitParts = () => {
  const [astroSuitPartsNFTContract, setAstroSuitPartsNFTContract] =
    useState(null);
  const [balances, setBalances] = useState([]);
  const [chain, setChain] = useState(0);
  const [txnInProgress, setTxnInProgress] = useState(false);

  // const [metadatasAndBalances, setMetadatas] = useState({});

  const { open } = useWeb3Modal();
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected, address, chainId } = useWeb3ModalAccount();

  useEffect(() => {
    setChain(chainId);
  }, [chainId]);

  const getAstroSuitBalancesAndMetadata = async (address) => {
    const metadataAndBalancesArray = [];
    try {
      console.log("hello");
      const fetchedBalances = await astroSuitPartsNFTContract.balanceOfBatch(
        [address, address, address, address],
        [0, 1, 2, 3]
      );
      // setBalances((balances) => [...balances, fetchedBalances]);
      console.log(fetchedBalances[0]);

      for (let i = 0; i < 4; i++) {
        const uri = await astroSuitPartsNFTContract.tokenURI(i);
        const res = await (await fetch(uri)).json();
        console.log((await res).image);
        metadataAndBalancesArray.push({
          balance: fetchedBalances[i],
          image: (await res).image,
          name: (await res).name,
        });
      }

      // console.log(metadataAndBalancesArray);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(metadataAndBalancesArray);
      setBalances((balances) => [...metadataAndBalancesArray]);
    }
  };

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

  const mintAstroSuitPartsNFT = async (selector, address) => {
    try {
      setTxnInProgress(true);
      if (selector === 0) {
        const tx = await astroSuitPartsNFTContract.mintGloves(address);
        await tx.wait();
      } else if (selector === 1) {
        const tx = await astroSuitPartsNFTContract.mintHelmet(address);
        await tx.wait();
      } else if (selector === 2) {
        const tx = await astroSuitPartsNFTContract.mintSuit(address);
        await tx.wait();
      } else if (selector === 3) {
        const tx = await astroSuitPartsNFTContract.mintBoots(address);
        await tx.wait();
      } else {
        console.log("Invalid tokenID");
        setTxnInProgress(false);
      }
    } catch (error) {
      setTxnInProgress(false);
      console.log(error);
    } finally {
      await getAstroSuitBalancesAndMetadata(address);
      setTxnInProgress(false);
    }
  };

  useEffect(() => {
    if (walletProvider && isConnected && chain === 11155111) {
      getAstroSuitPartsNFTContract(walletProvider);
    }
    console.log(walletProvider, isConnected);
  }, [walletProvider, chain]);

  useEffect(() => {
    if (address && astroSuitPartsNFTContract && isConnected) {
      getAstroSuitBalancesAndMetadata(address);
      console.log(balances);
    }
  }, [astroSuitPartsNFTContract]);

  return (
    <div>
      {txnInProgress && <Loader />}
      <h2 className="text-4xl font-bold text-white mb-4">AstroSuitParts NFT</h2>
      {chain === 11155111 ? (
        <div className="p-4 flex flex-row">
          {balances.map((item, idx) => (
            // <img
            //   className={item.balance > 0 ? `mx-4 ` : `mx-4 brightness-50`}
            //   key={idx}
            //   src={item.image}
            //   alt=""
            //   width="270px"
            // />
            <Card
              key={idx}
              _id={idx}
              name={item.name}
              photo={item.image}
              balance={item.balance}
              mint={mintAstroSuitPartsNFT}
              address={address}
            />
          ))}
        </div>
      ) : (
        <button
          className="text-white bg-emerald-600 font-medium rounded-md text-md w-full sm:w-auto px-3 py-1.5 text-center my-12"
          onClick={() => {
            open({ view: "Networks" });
          }}
        >
          Switch to Sepolia Testnet to view content
        </button>
      )}
    </div>
  );
};

export default AstroSuitParts;
