import React, { useEffect, useState } from "react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";

const ConnectWalletButton = () => {
  const { address, isConnected } = useWeb3ModalAccount();
  const [userAddress, setUserAddress] = useState("");
  const [isWalletConnect, setIsWalletConnect] = useState(false);

  useEffect(() => {
    // const { address, isConnected } = useWeb3ModalAccount();
    if (isConnected && address !== "") {
      setIsWalletConnect(true);
      setUserAddress(address);
    }
  }, [isConnected]);
  useEffect(() => {
    setUserAddress(address);
  }, [address]);
  const { open } = useWeb3Modal();
  return (
    <>
      {!isWalletConnect ? (
        <button
          onClick={() => open()}
          className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
        >
          Connect Wallet
        </button>
      ) : (
        <button
          onClick={() => open()}
          className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
        >{`${userAddress.substring(0, 10)}...`}</button>
      )}
    </>
  );
};

export default ConnectWalletButton;
