/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type { AlligatorOPV5, AlligatorOPV5Interface } from "../AlligatorOPV5";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
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
        internalType: "address",
        name: "customRule",
        type: "address",
      },
    ],
    name: "InvalidCustomRule",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum ECDSAUpgradeable.RecoverError",
        name: "recoverError",
        type: "uint8",
      },
    ],
    name: "InvalidSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "LengthMismatch",
    type: "error",
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
    ],
    name: "NotDelegated",
    type: "error",
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
        name: "wasValidUntil",
        type: "uint256",
      },
    ],
    name: "NotValidAnymore",
    type: "error",
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
        name: "willBeValidFrom",
        type: "uint256",
      },
    ],
    name: "NotValidYet",
    type: "error",
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
        name: "blocksBeforeVoteCloses",
        type: "uint256",
      },
    ],
    name: "TooEarly",
    type: "error",
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
    ],
    name: "TooManyRedelegations",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroVotesToCast",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
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
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
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
        components: [
          {
            internalType: "uint8",
            name: "maxRedelegations",
            type: "uint8",
          },
          {
            internalType: "uint16",
            name: "blocksBeforeVoteCloses",
            type: "uint16",
          },
          {
            internalType: "uint32",
            name: "notValidBefore",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "notValidAfter",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "customRule",
            type: "address",
          },
          {
            internalType: "enum AllowanceType",
            name: "allowanceType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "allowance",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct SubdelegationRules",
        name: "subdelegationRules",
        type: "tuple",
      },
    ],
    name: "SubDelegation",
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
        indexed: false,
        internalType: "address[]",
        name: "to",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "maxRedelegations",
            type: "uint8",
          },
          {
            internalType: "uint16",
            name: "blocksBeforeVoteCloses",
            type: "uint16",
          },
          {
            internalType: "uint32",
            name: "notValidBefore",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "notValidAfter",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "customRule",
            type: "address",
          },
          {
            internalType: "enum AllowanceType",
            name: "allowanceType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "allowance",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct SubdelegationRules",
        name: "subdelegationRules",
        type: "tuple",
      },
    ],
    name: "SubDelegations",
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
        indexed: false,
        internalType: "address[]",
        name: "to",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "maxRedelegations",
            type: "uint8",
          },
          {
            internalType: "uint16",
            name: "blocksBeforeVoteCloses",
            type: "uint16",
          },
          {
            internalType: "uint32",
            name: "notValidBefore",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "notValidAfter",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "customRule",
            type: "address",
          },
          {
            internalType: "enum AllowanceType",
            name: "allowanceType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "allowance",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct SubdelegationRules[]",
        name: "subdelegationRules",
        type: "tuple[]",
      },
    ],
    name: "SubDelegations",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "proxy",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "authority",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "support",
        type: "uint8",
      },
    ],
    name: "VoteCast",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "proxies",
        type: "address[]",
      },
      {
        indexed: true,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[][]",
        name: "authorities",
        type: "address[][]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "support",
        type: "uint8",
      },
    ],
    name: "VotesCast",
    type: "event",
  },
  {
    inputs: [],
    name: "BALLOT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BALLOT_WITHPARAMS_BATCHED_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BALLOT_WITHPARAMS_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GOVERNOR",
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
    name: "OP_TOKEN",
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
    name: "_togglePause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "authority",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "support",
        type: "uint8",
      },
    ],
    name: "castVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "authority",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "support",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "castVoteBySig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "authority",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "support",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "castVoteWithReason",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "authority",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "support",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "params",
        type: "bytes",
      },
    ],
    name: "castVoteWithReasonAndParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[][]",
        name: "authorities",
        type: "address[][]",
      },
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "support",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "params",
        type: "bytes",
      },
    ],
    name: "castVoteWithReasonAndParamsBatched",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "authority",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "support",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "params",
        type: "bytes",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "castVoteWithReasonAndParamsBySig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_initOwner",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "maxVotingPower",
        type: "uint256",
      },
      {
        internalType: "address[][]",
        name: "authorities",
        type: "address[][]",
      },
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "support",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "params",
        type: "bytes",
      },
    ],
    name: "limitedCastVoteWithReasonAndParamsBatched",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "maxVotingPower",
        type: "uint256",
      },
      {
        internalType: "address[][]",
        name: "authorities",
        type: "address[][]",
      },
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "support",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "params",
        type: "bytes",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "limitedCastVoteWithReasonAndParamsBatchedBySig",
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
    name: "paused",
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
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "proxyOwner",
        type: "address",
      },
    ],
    name: "proxyAddress",
    outputs: [
      {
        internalType: "address",
        name: "endpoint",
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
        name: "to",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "maxRedelegations",
            type: "uint8",
          },
          {
            internalType: "uint16",
            name: "blocksBeforeVoteCloses",
            type: "uint16",
          },
          {
            internalType: "uint32",
            name: "notValidBefore",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "notValidAfter",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "customRule",
            type: "address",
          },
          {
            internalType: "enum AllowanceType",
            name: "allowanceType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "allowance",
            type: "uint256",
          },
        ],
        internalType: "struct SubdelegationRules",
        name: "subdelegationRules",
        type: "tuple",
      },
    ],
    name: "subdelegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "maxRedelegations",
            type: "uint8",
          },
          {
            internalType: "uint16",
            name: "blocksBeforeVoteCloses",
            type: "uint16",
          },
          {
            internalType: "uint32",
            name: "notValidBefore",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "notValidAfter",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "customRule",
            type: "address",
          },
          {
            internalType: "enum AllowanceType",
            name: "allowanceType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "allowance",
            type: "uint256",
          },
        ],
        internalType: "struct SubdelegationRules[]",
        name: "subdelegationRules",
        type: "tuple[]",
      },
    ],
    name: "subdelegateBatched",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "maxRedelegations",
            type: "uint8",
          },
          {
            internalType: "uint16",
            name: "blocksBeforeVoteCloses",
            type: "uint16",
          },
          {
            internalType: "uint32",
            name: "notValidBefore",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "notValidAfter",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "customRule",
            type: "address",
          },
          {
            internalType: "enum AllowanceType",
            name: "allowanceType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "allowance",
            type: "uint256",
          },
        ],
        internalType: "struct SubdelegationRules",
        name: "subdelegationRules",
        type: "tuple",
      },
    ],
    name: "subdelegateBatched",
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
    ],
    name: "subdelegations",
    outputs: [
      {
        internalType: "uint8",
        name: "maxRedelegations",
        type: "uint8",
      },
      {
        internalType: "uint16",
        name: "blocksBeforeVoteCloses",
        type: "uint16",
      },
      {
        internalType: "uint32",
        name: "notValidBefore",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "notValidAfter",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "customRule",
        type: "address",
      },
      {
        internalType: "enum AllowanceType",
        name: "allowanceType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "allowance",
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
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "proxy",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "votesCast",
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
] as const;

export class AlligatorOPV5__factory {
  static readonly abi = _abi;
  static createInterface(): AlligatorOPV5Interface {
    return new Interface(_abi) as AlligatorOPV5Interface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): AlligatorOPV5 {
    return new Contract(address, _abi, runner) as unknown as AlligatorOPV5;
  }
}
