export const ContractAddress = "0x8D501c4b41F821E2AF7ddc9D7631f3fB72c8046B";

export const ContractAbi = [
    {inputs: [], stateMutability: "payable", type: "constructor"},
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "funder",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "Funded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "Withdrawn",
        type: "event",
    },
    {stateMutability: "payable", type: "fallback"},
    {
        inputs: [],
        name: "MINIMUM_USD",
        outputs: [{internalType: "uint256", name: "", type: "uint256"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{internalType: "address", name: "funder", type: "address"}],
        name: "addressToAmountFunded",
        outputs: [
            {internalType: "uint256", name: "fundedAmount", type: "uint256"},
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "fund",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [{internalType: "uint256", name: "", type: "uint256"}],
        name: "funders",
        outputs: [{internalType: "address", name: "", type: "address"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getFunderLength",
        outputs: [{internalType: "uint256", name: "", type: "uint256"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "i_owner",
        outputs: [{internalType: "address", name: "", type: "address"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{internalType: "address", name: "funder", type: "address"}],
        name: "isFunder",
        outputs: [{internalType: "bool", name: "isFunded", type: "bool"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {stateMutability: "payable", type: "receive"},
];
