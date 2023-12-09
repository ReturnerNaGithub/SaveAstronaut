"use client";
import React, { useEffect, useState } from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useWeb3Modal,
} from "@web3modal/ethers/react";
import {
  BrowserProvider,
  Contract,
  formatUnits,
  parseEther,
  BigNumberish,
} from "ethers";
import {
  SourceMinter,
  Link,
  DestinationMinter,
} from "../../artifacts/artifacts";
import FormField from "./FormField";
// import {  } from "./AstroSuitParts";
import Loader from "./Loader";
import ReactModal from "react-modal";

const MergeArea = () => {
  const [sourceMinterContract, setSourceMinterContract] = useState(null);
  const [balances, setBalances] = useState({});
  const [chain, setChain] = useState(0);

  const [linkBal, setLinkBal] = useState(0);
  const [nativeBal, setNativeBal] = useState(0);

  const [linkAmt, setLinkAmt] = useState(0);
  const [nativeAmt, setNativeAmt] = useState(0);

  const [mergeFeeNative, setMergeFeeNative] = useState(0);
  const [mergeFeeLink, setMergeFeeLink] = useState(0);

  const [txnInProgress, setTxnInProgress] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);

  const [messageId, setMessageId] = useState("");

  const [merges, setMerges] = useState([]);

  const { open } = useWeb3Modal();
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected, address, chainId } = useWeb3ModalAccount();

  useEffect(() => {
    setChain(chainId);
  }, [chainId]);

  const getSourceMinterContract = async (walletProvider) => {
    try {
      const provider = new BrowserProvider(walletProvider);
      //   console.log(provider);
      const signer = await provider.getSigner();
      //   console.log(signer);
      const sourceMinter = new Contract(
        SourceMinter.address,
        SourceMinter.abi,
        signer
      );
      console.log(sourceMinter.target);
      setSourceMinterContract(sourceMinter);
      // return astroSuitPartsNFT;
    } catch (error) {
      console.log(error);
    }
  };

  const getSourceMinterBalances = async (address) => {
    try {
      const nativeBalance = await sourceMinterContract.getNativeDeposits(
        address
      );
      const linkBalance = await sourceMinterContract.getLinkDeposits(address);

      setLinkBal(Number(linkBalance));
      setNativeBal(Number(nativeBalance));
    } catch (error) {
      console.log(error);
    } finally {
      //   console.log(fetchedBalances);
      //   setBalances((balances) => ({ ...fetchedBalances }));
    }
  };

  const fundNative = async () => {
    try {
      if (nativeAmt > 0) {
        const provider = new BrowserProvider(walletProvider);
        const signer = await provider.getSigner();
        setTxnInProgress(true);
        const tx = await signer.sendTransaction({
          to: sourceMinterContract.target,
          value: parseEther(nativeAmt.toString()),
        });
        await tx.wait();
      } else {
        setTxnInProgress(false);
        return;
      }
    } catch (error) {
      console.log(error);
      setTxnInProgress(false);
    } finally {
      await getSourceMinterBalances(address);
      setTxnInProgress(false);
    }
  };

  const fundLink = async () => {
    try {
      if (linkAmt > 0) {
        const provider = new BrowserProvider(walletProvider);
        const signer = await provider.getSigner();
        setTxnInProgress(true);
        const linkContract = new Contract(Link.address, Link.abi, signer);
        const tx1 = await linkContract
          .connect(signer)
          .approve(sourceMinterContract.target, parseEther(linkAmt.toString()));
        await tx1.wait();
        const tx2 = await sourceMinterContract
          .connect(signer)
          .receiveLink(parseEther(linkAmt.toString()));
        await tx2.wait();
        // const tx1 = await tx.wait();
      } else {
        setTxnInProgress(false);
        return;
      }
    } catch (error) {
      setTxnInProgress(false);
      console.log(error);
    } finally {
      await getSourceMinterBalances(address);
      setTxnInProgress(false);
    }
  };

  const getMergeFeeNative = async () => {
    try {
      const fetchedMergeFee = await sourceMinterContract.getMergeFee(
        "12532609583862916517",
        DestinationMinter.address,
        0
      );

      console.log(Number(fetchedMergeFee), nativeBal);

      setMergeFeeNative(Number(fetchedMergeFee));
    } catch (error) {
      console.log(error);
    } finally {
      //   console.log(fetchedBalances);
      //   setBalances((balances) => ({ ...fetchedBalances }));
    }
  };

  const getMergeFeeLink = async () => {
    try {
      const fetchedMergeFee = await sourceMinterContract.getMergeFee(
        "12532609583862916517",
        DestinationMinter.address,
        1
      );

      //   console.log(Number(fetchedMergeFee), nativeBal);

      setMergeFeeLink(Number(fetchedMergeFee));
    } catch (error) {
      console.log(error);
    } finally {
      //   console.log(fetchedBalances);
      //   setBalances((balances) => ({ ...fetchedBalances }));
    }
  };

  useEffect(() => {
    if (walletProvider && isConnected && chain === 11155111) {
      getSourceMinterContract(walletProvider);
    }
    console.log(walletProvider, isConnected);
  }, [walletProvider, chain]);

  useEffect(() => {
    if (address && sourceMinterContract && isConnected) {
      getSourceMinterBalances(address);
      getMergeFeeNative();
      getMergeFeeLink();
    }
  }, [sourceMinterContract]);

  const handleLinkChange = (e) => {
    e.preventDefault();
    setLinkAmt(e.target.value);
  };
  const handleNativeChange = (e) => {
    e.preventDefault();
    setNativeAmt(e.target.value);
  };

  const withdrawLink = async () => {
    try {
      if (linkBal > 0) {
        setTxnInProgress(true);
        const provider = new BrowserProvider(walletProvider);
        const signer = await provider.getSigner();
        const tx = await sourceMinterContract.connect(signer).withdrawLink();
        await tx.wait();
      } else {
        setTxnInProgress(false);
        return;
      }
    } catch (error) {
      console.log(error);
      setTxnInProgress(false);
    } finally {
      await getSourceMinterBalances(address);
      await getMergeFeeLink();
      setTxnInProgress(false);
    }
  };

  const withdrawNative = async () => {
    try {
      setTxnInProgress(true);
      if (nativeBal > 0) {
        const provider = new BrowserProvider(walletProvider);
        const signer = await provider.getSigner();
        const tx = await sourceMinterContract.connect(signer).withdrawNative();
        await tx.wait();
      } else {
        setTxnInProgress(false);
        return;
      }
    } catch (error) {
      console.log(error);
      setTxnInProgress(false);
    } finally {
      await getSourceMinterBalances(address);
      await getMergeFeeNative();
      setTxnInProgress(false);
    }
  };

  const mergeNative = async () => {
    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const possible = await sourceMinterContract
        .connect(signer)
        .checkBalanceForMerge(
          "12532609583862916517",
          DestinationMinter.address,
          0
        );
      if (possible) {
        setTxnInProgress(true);
        const tx = await sourceMinterContract
          .connect(signer)
          .merge("12532609583862916517", DestinationMinter.address, 0);
        const res = await tx.wait();
        const messageId = res.logs[4].data;
        setMessageId(messageId);
        console.log(res);
      } else {
        setTxnInProgress(false);
        return;
      }
    } catch (error) {
      setTxnInProgress(false);
      console.log(error);
    } finally {
      await getSourceMinterBalances(address);
      await getMergeFeeNative();
      await getMerges();
      //   await getAstroSuitBalancesAndMetadata(address);
      setTxnInProgress(false);
      setDisplayModal(true);
    }
  };

  const mergeLink = async () => {
    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const possible = await sourceMinterContract
        .connect(signer)
        .checkBalanceForMerge(
          "12532609583862916517",
          DestinationMinter.address,
          1
        );
      if (possible) {
        setTxnInProgress(true);
        const tx = await sourceMinterContract
          .connect(signer)
          .merge("12532609583862916517", DestinationMinter.address, 1);
        await tx.wait();
        const res = await tx.wait();
        const messageId = res.logs[4].data;
        setMessageId(messageId);
        console.log(res);
      } else {
        setTxnInProgress(false);
        return;
      }
    } catch (error) {
      setTxnInProgress(false);
      console.log(error);
    } finally {
      await getSourceMinterBalances(address);
      await getMergeFeeNative();
      //   await getAstroSuitBalancesAndMetadata(address);
      await getMerges();
      setTxnInProgress(false);
      setDisplayModal(true);
    }
  };

  const getMerges = async (address) => {
    try {
      const fetchedMerges = await sourceMinterContract.getMerges(address);
      console.log("fetched", fetchedMerges[0]);
      setMerges((merges) => [...fetchedMerges]);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    if (address && sourceMinterContract && isConnected) {
      getMerges(address);
    }
  }, [sourceMinterContract]);

  //   useEffect(() => {
  //     console.log(mergeFeeLink > 0 ? nativeBal / mergeFeeNative : 0);
  //     // console.log(formatUnits(nativeBal, 18));
  //   }, [nativeBal]);

  return (
    <div>
      {txnInProgress && <Loader />}
      {displayModal && (
        <ReactModal
          isOpen={displayModal}
          //   onRequestClose={() => setDisplayModal(false)}
          className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col backdrop-filter backdrop-blur-xl"
          //   overlayClassName="Overlay"
        >
          <h1 className="font-bold text-[20px] text-violet-300 mb-5 mt-3">
            Merge Initiated
          </h1>
          <p className="text-green-50 mx-10">
            Your brand new Merged Full AstroSuit NFT will be automatically
            minted to your address in Mumbai(Polygon) Testnet once the Chainlink
            CCIP call is successful. CCIP transaction typically take up to 20-30
            minutes and may even take upto 1 hour depending upon the current
            network traffic so please be patient and bear with us.
          </p>
          <br />

          <p>
            Find more about your merge transaction{" "}
            <a
              className="text-violet-600 font-bold mb-15"
              href={`https://ccip.chain.link/msg/${messageId}`}
              target="_blank"
            >
              here
            </a>
          </p>

          <button
            type="button"
            onClick={() => {
              setDisplayModal(false);
            }}
            className=" mt-10 text-white bg-red-400 font-medium rounded-sm text-[12px] ml-4 px-1.5 py-0.75 text-center"
          >
            Close
          </button>
        </ReactModal>
      )}

      <h2 className="text-4xl font-bold text-white mt-20 mb-7">Merging Area</h2>
      {chain === 11155111 ? (
        <div className="p-7 flex flex-col">
          <div>
            <p className="text-xl">
              Native Deposits: {(nativeBal / 10 ** 18).toFixed(3)} ETH{" "}
            </p>
            <div className="flex flex-row">
              <p className="text-[12px]">
                (
                {(mergeFeeNative > 0 ? nativeBal / mergeFeeNative : 0).toFixed(
                  2
                )}{" "}
                Merges possible)
              </p>
              <button
                type="button"
                onClick={withdrawNative}
                className="text-white bg-red-400 font-medium rounded-sm text-[12px] ml-4 px-1.5 py-0.75 text-center"
              >
                Withdraw Native
              </button>
            </div>
            <FormField
              buttonTxt={"Native"}
              handleChange={handleNativeChange}
              placeholder={"Enter Native Amount"}
              fund={fundNative}
              merge={mergeNative}
            />
          </div>
          <br />
          <br />
          <p className="text-xl">
            Link Deposits: {(linkBal / 10 ** 18).toFixed(3)} LINK
          </p>
          <div className="flex flex-row">
            <p className="text-[12px]">
              ({(mergeFeeLink > 0 ? linkBal / mergeFeeLink : 0).toFixed(2)}{" "}
              Merges possible)
            </p>
            <button
              type="button"
              className="text-white bg-red-400 font-medium rounded-sm text-[12px] ml-4 px-1.5 py-0.75 text-center"
              onClick={withdrawLink}
            >
              Withdraw LINK
            </button>
          </div>
          <FormField
            fund={fundLink}
            buttonTxt={"LINK"}
            handleChange={handleLinkChange}
            placeholder={"Enter LINK Amount"}
            merge={mergeLink}
          />
          <div className="mt-10">
            <h3 className="text-xl mb-5">My Merges</h3>
            <ul className="flex flex-col">
              {merges.length > 0 ? (
                merges.map((item, idx) => (
                  <li>
                    <a
                      className="ml-4 text-[14px] text-violet-600"
                      key={idx}
                      href={`https://ccip.chain.link/msg/${item}`}
                      target="_blank"
                    >
                      {item}
                    </a>
                  </li>
                ))
              ) : (
                <p className="ml-4 text-[14px]">Nothing to show</p>
              )}
            </ul>
          </div>
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

export default MergeArea;
