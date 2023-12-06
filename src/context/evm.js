const { BrowserProvider, Contract } = require("ethers");
const {
  SourceMinter,
  AstroSuitPartsNFT,
  AstroSuitFullNFT,
  DestinationMinter,
} = require("../artifacts/artifacts");

const getSourceMinterContract = async (walletProvider) => {
  try {
    const provider = new BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    const sourceMinter = new Contract(
      SourceMinter.address,
      SourceMinter.abi,
      signer
    );
    return sourceMinter;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAstroSuitPartsNFTContract = async (walletProvider) => {
  try {
    const provider = new BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    const astroSuitPartsNFT = new Contract(
      AstroSuitPartsNFT.address,
      AstroSuitPartsNFT.abi,
      signer
    );
    return astroSuitPartsNFT;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAstroSuitPartsURI = async (walletProvider, tokenId) => {
  const astroSuitPartsNFT = await getAstroSuitPartsNFTContract(walletProvider);
  if (astroSuitPartsNFT instanceof Contract) {
    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      return await astroSuitPartsNFT
        .connect(signer)
        .balanceOfBatch(
          [signer.address, signer.address, signer.address, signer.address],
          [0, 1, 2, 3]
        );
    } catch (error) {
      console.log(error);
      return error;
    }
  } else {
    return astroSuitPartsNFT;
  }
};

const getAstroSuitPartsTokenBalances = async (address) => {
  const astroSuitPartsNFT = await getAstroSuitPartsNFTContract(walletProvider);
  if (astroSuitPartsNFT instanceof Contract) {
    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      return await astroSuitPartsNFT
        .connect(signer)
        .balanceOfBatch(
          [signer.address, signer.address, signer.address, signer.address],
          [0, 1, 2, 3]
        );
    } catch (error) {
      console.log(error);
      return error;
    }
  } else {
    return astroSuitPartsNFT;
  }
};

const getAstroSuitFullNFTContract = async (walletProvider) => {
  try {
    const provider = new BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    const astroSuitFullNFT = new Contract(
      AstroSuitFullNFT.address,
      AstroSuitFullNFT.abi,
      signer
    );
    return astroSuitFullNFT;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getDestinationMinterContract = async (walletProvider) => {
  try {
    const provider = new BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    const destinationMinter = new Contract(
      DestinationMinter.address,
      DestinationMinter.abi,
      signer
    );
    return destinationMinter;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getSourceMinterContract,
  getAstroSuitPartsNFTContract,
  getAstroSuitPartsTokenBalances,
  getAstroSuitFullNFTContract,
  getDestinationMinterContract,
};
