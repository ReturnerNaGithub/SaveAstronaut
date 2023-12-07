"use client";
import React, { useEffect, useState } from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { SourceMinter, AstroSuitPartsNFT } from "../../artifacts/artifacts";
const imageUris = [
  "https://gateway.pinata.cloud/ipfs/QmdTDsjaih5GmcZteJKsXk7nxhhrD9GAnvyUWzggvufzzu/gloves.png",
  "https://gateway.pinata.cloud/ipfs/QmdTDsjaih5GmcZteJKsXk7nxhhrD9GAnvyUWzggvufzzu/helmet.png",
  "https://gateway.pinata.cloud/ipfs/QmdTDsjaih5GmcZteJKsXk7nxhhrD9GAnvyUWzggvufzzu/suit.png",
  "https://gateway.pinata.cloud/ipfs/QmdTDsjaih5GmcZteJKsXk7nxhhrD9GAnvyUWzggvufzzu/boots.png",
];

const AstroSuitParts = () => {
  const [astroSuitPartsNFTContract, setAstroSuitPartsNFTContract] =
    useState(null);
  const [balances, setBalances] = useState([]);
  // const [metadatasAndBalances, setMetadatas] = useState({});

  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected, address } = useWeb3ModalAccount();

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

  useEffect(() => {
    if (walletProvider && isConnected) {
      getAstroSuitPartsNFTContract(walletProvider);
    }
    console.log(walletProvider, isConnected);
  }, []);

  useEffect(() => {
    if (address && astroSuitPartsNFTContract && isConnected) {
      getAstroSuitBalancesAndMetadata(address);
      console.log(balances);
    }
  }, [astroSuitPartsNFTContract]);

  return (
    <div className="p-4 flex flex-row">
      {balances.map(
        (item, idx) =>
          item.balance > 0 && (
            <img
              className="mx-4"
              key={idx}
              src={item.image}
              alt=""
              width="270px"
            />
          )
      )}
    </div>
  );
};

export default AstroSuitParts;
