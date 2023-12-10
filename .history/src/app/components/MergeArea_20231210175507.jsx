"use client";
import React, { useEffect, useState } from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useWeb3Modal,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits, parseEther } from "ethers";
import {
  SourceMinter,
  Link,
  DestinationMinter,
} from "../../artifacts/artifacts";
import FormField from "./FormField";
import Loader from "./Loader";
import ReactModal from "react-modal";
import { IoReloadOutline } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const errArr = error.info.error.message.split(":");
      errArr.shift();
      toast.error(errArr.join(":"));
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
      const errArr = error.info.error.message.split(":");
      errArr.shift();
      toast.error(errArr.join(":"));
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
        const tx = await signer.sendTransaction({
          to: sourceMinterContract.target,
          value: parseEther(nativeAmt.toString()),
        });
        setTxnInProgress(true);
        await tx.wait();
        toast.success(`Successfully funded ${nativeAmt} ETH`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.warn("Please enter a non-zero value", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTxnInProgress(false);
        return;
      }
    } catch (error) {
      console.log(error);
      const errArr = error.info.error.message.split(":");
      errArr.shift();
      toast.error(errArr.join(), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
        const linkContract = new Contract(Link.address, Link.abi, signer);
        setTxnInProgress(true);
        const tx1 = await linkContract
          .connect(signer)
          .approve(sourceMinterContract.target, parseEther(linkAmt.toString()));
        await tx1.wait();
        const tx2 = await sourceMinterContract
          .connect(signer)
          .receiveLink(parseEther(linkAmt.toString()));
        await tx2.wait();
        toast.success(`Successfully funded ${linkAmt} LINK`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // const tx1 = await tx.wait();
      } else {
        toast.warn("Please enter a non-zero value", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTxnInProgress(false);
        return;
      }
    } catch (error) {
      const errArr = error.info.error.message.split(":");
      errArr.shift();
      toast.error(errArr.join(":"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
      const errArr = error.info.error.message.split(":");
      errArr.shift();
      toast.error(errArr.joIn(":"));
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
      const errArr = error.info.error.message.split(":");
      errArr.shift();
      toast.error(errArr.join(":"));
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
        const provider = new BrowserProvider(walletProvider);
        const signer = await provider.getSigner();
        const tx = await sourceMinterContract.connect(signer).withdrawLink();
        setTxnInProgress(true);
        await tx.wait();
        toast.success(`Successfully withdrawn LINK Deposits`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.warn(`You don't have any LINK Deposits`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTxnInProgress(false);
        return;
      }
    } catch (error) {
      const errArr = error.info.error.message.split(":");
      errArr.shift();
      toast.error(errArr.join(":"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
      if (nativeBal > 0) {
        const provider = new BrowserProvider(walletProvider);
        const signer = await provider.getSigner();
        const tx = await sourceMinterContract.connect(signer).withdrawNative();
        setTxnInProgress(true);
        await tx.wait();
        toast.success(`Successfully withdrawn Native Deposits`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "white",
        });
      } else {
        toast.warn(`You don't have any Native Deposits`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTxnInProgress(false);
        return;
      }
    } catch (error) {
      const errArr = error.info.error.message.split(":");
      errArr.shift();
      toast.error(errArr.join(":"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
        const tx = await sourceMinterContract
          .connect(signer)
          .merge("12532609583862916517", DestinationMinter.address, 0);
        setTxnInProgress(true);
        const res = await tx.wait();
        const messageId = res.logs[4].data;
        setMessageId(messageId);
        console.log(res);
        toast.success(
          `Merge Initiated Successfully (messageId: ${messageId.substring(
            0,
            11
          )}...)`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        setDisplayModal(true);
      } else {
        toast.warn(`You don't have enough LINK Deposits to perform a Merge.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTxnInProgress(false);
        return;
      }
    } catch (error) {
      const errArr = error.info.error.message.split(":");
      errArr.shift();
      toast.error(errArr.join(":"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTxnInProgress(false);
      console.log(error);
    } finally {
      await getSourceMinterBalances(address);
      await getMergeFeeNative();
      await getMerges(address);
      //   await getAstroSuitBalancesAndMetadata(address);
      setTxnInProgress(false);
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
        const tx = await sourceMinterContract
          .connect(signer)
          .merge("12532609583862916517", DestinationMinter.address, 1);
        setTxnInProgress(true);
        await tx.wait();
        const res = await tx.wait();
        const messageId = res.logs[4].data;
        setMessageId(messageId);
        console.log(res);
        toast.success(
          `Merge Initiated Successfully (messageId: ${messageId?.substring(
            0,
            11
          )}...)`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        setDisplayModal(true);
      } else {
        setTxnInProgress(false);
        toast.warn(`You don't have enough LINK Deposits to perform a Merge.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
    } catch (error) {
      const errArr = error.info.error.message.split(":");
      errArr.shift();
      toast.error(errArr.join(":"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTxnInProgress(false);
      console.log(error);
    } finally {
      await getSourceMinterBalances(address);
      await getMergeFeeNative();
      //   await getAstroSuitBalancesAndMetadata(address);
      await getMerges(address);
      setTxnInProgress(false);
    }
  };

  const getMerges = async (address) => {
    try {
      const fetchedMerges = await sourceMinterContract.getMerges(address);
      console.log("fetched", fetchedMerges[0]);
      setMerges((merges) => [...fetchedMerges]);
    } catch (error) {
      console.log(error);
      const errArr = error?.info?.error?.message.split(":");
      errArr?.shift();
      toast.error(errArr?.join(":"));
    } finally {
    }
  };

  useEffect(() => {
    if (address && sourceMinterContract && isConnected) {
      getMerges(address);
    }
  }, [sourceMinterContract]);

  const reload = async (address) => {
    await getSourceMinterBalances(address);
    await getMergeFeeLink();
    await getMergeFeeNative();
    await getMerges(address);
  };

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

      <h2 className="text-4xl font-bold text-white mt-20 mb-7">
        Merging Area
        <button
          className="ml-5"
          onClick={() => {
            reload(address);
          }}
        >
          <IoReloadOutline />
        </button>
      </h2>
      {chain === 11155111 ? (
        <div className="p-7 flex flex-col">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <div>
            <p className="text-xl">
              Native Deposits: {(nativeBal / 10 ** 18).toFixed(3)} ETH{" "}
            </p>
            <div className="flex flex-row text-white bg-red-400">
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
                      className="ml-4 text-[14px] text-violet-600 flex flex-row"
                      key={idx}
                      href={`https://ccip.chain.link/msg/${item}`}
                      target="_blank"
                    >
                      {item}
                      <FiExternalLink className="ml-2 mt-1" />
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
