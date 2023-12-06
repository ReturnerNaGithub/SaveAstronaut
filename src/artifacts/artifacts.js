export const SourceMinter = {
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "router",
          type: "address",
        },
        {
          internalType: "address",
          name: "link",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "FailedToWithdrawEth",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bytes32",
          name: "messageId",
          type: "bytes32",
        },
      ],
      name: "MessageSent",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "OwnershipTransferRequested",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [],
      name: "acceptOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "destinationChainSelector",
          type: "uint64",
        },
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          internalType: "enum SourceMinter.PayFeesIn",
          name: "payFeesIn",
          type: "uint8",
        },
      ],
      name: "checkBalanceForMerge",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getLinkDeposits",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "destinationChainSelector",
          type: "uint64",
        },
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          internalType: "enum SourceMinter.PayFeesIn",
          name: "payFeesIn",
          type: "uint8",
        },
      ],
      name: "getMergeFee",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getNativeDeposits",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "destinationChainSelector",
          type: "uint64",
        },
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          internalType: "enum SourceMinter.PayFeesIn",
          name: "payFeesIn",
          type: "uint8",
        },
      ],
      name: "merge",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "receiveLink",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_astroPartsNft",
          type: "address",
        },
      ],
      name: "setAstroPartsNft",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawLink",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawNative",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ],
  address: "0x4f49ACcA3676A27357dD5b69980238BA4B37c577",
};

export const AstroSuitPartsNFT = {
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_initOwner",
          type: "address",
        },
        {
          internalType: "address payable",
          name: "_sourceMinterAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_maxTokenSupply",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_maxTokenSupplyPerAddress",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ERC1155InsufficientBalance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "approver",
          type: "address",
        },
      ],
      name: "ERC1155InvalidApprover",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "idsLength",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "valuesLength",
          type: "uint256",
        },
      ],
      name: "ERC1155InvalidArrayLength",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "ERC1155InvalidOperator",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "ERC1155InvalidReceiver",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "ERC1155InvalidSender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "ERC1155MissingApprovalForAll",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_minter",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "BootsMinted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_minter",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "GlovesMinted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_minter",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "HelmetMinted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_minter",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "SuitMinted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "ids",
          type: "uint256[]",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "values",
          type: "uint256[]",
        },
      ],
      name: "TransferBatch",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "TransferSingle",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "value",
          type: "string",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "URI",
      type: "event",
    },
    {
      inputs: [],
      name: "BOOTS",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "GLOVES",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "HELMET",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "SUIT",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "accounts",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "ids",
          type: "uint256[]",
        },
      ],
      name: "balanceOfBatch",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_from",
          type: "address",
        },
      ],
      name: "burnItAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
      ],
      name: "mintBoots",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
      ],
      name: "mintGloves",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
      ],
      name: "mintHelmet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
      ],
      name: "mintSuit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256[]",
          name: "ids",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "values",
          type: "uint256[]",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeBatchTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256",
        },
      ],
      name: "uri",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
  ],
  address: "0xfb93fa841DA0010FfbF9c336Ebd47E2cF7db91A9",
};

export const AstroSuitFullNFT = {
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_initOwner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_maxTokenSupply",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "ERC721IncorrectOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ERC721InsufficientApproval",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "approver",
          type: "address",
        },
      ],
      name: "ERC721InvalidApprover",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "ERC721InvalidOperator",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "ERC721InvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "ERC721InvalidReceiver",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "ERC721InvalidSender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ERC721NonexistentToken",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_fromTokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_toTokenId",
          type: "uint256",
        },
      ],
      name: "BatchMetadataUpdate",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256",
        },
      ],
      name: "FullSuitMinted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256",
        },
      ],
      name: "MetadataUpdate",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  address: "0x115424fF1817C3a730c7C4F18d4edC7ad37e69b6",
};

export const DestinationMinter = {
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "router",
          type: "address",
        },
        {
          internalType: "address",
          name: "nftAddress",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "router",
          type: "address",
        },
      ],
      name: "InvalidRouter",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [],
      name: "MintCallSuccessfull",
      type: "event",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "bytes32",
              name: "messageId",
              type: "bytes32",
            },
            {
              internalType: "uint64",
              name: "sourceChainSelector",
              type: "uint64",
            },
            {
              internalType: "bytes",
              name: "sender",
              type: "bytes",
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
            {
              components: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              internalType: "struct Client.EVMTokenAmount[]",
              name: "destTokenAmounts",
              type: "tuple[]",
            },
          ],
          internalType: "struct Client.Any2EVMMessage",
          name: "message",
          type: "tuple",
        },
      ],
      name: "ccipReceive",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getRouter",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
  ],
  address: "0xC151d7c4dCCdc18Ba2A0F2132660Ae5a22ec3Cb0",
};
