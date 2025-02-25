"use client";

import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const chainOptions = [
  { value: "sepolia", label: "Sepolia", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
  { value: "Aptos", label: "Aptos", logo: "https://cryptologos.cc/logos/aptos-apt-logo.svg?v=040" },
  { value: "Solana", label: "Solana", logo: "https://cryptologos.cc/logos/solana-sol-logo.svg" },
  {value : "ArbSepolia", label: "ArbSepolia", logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg" }
];

const assetOptions = [
  { value: "usdt", label: "USDT", logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg" },
  { value: "usdc", label: "USDC", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg" },
  { value: "eth", label: "ETH/WETH", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" }
];

export default function Create() {
  const [inputs, setInputs] = useState([{ address: "", chain: "sepolia" }]);
  const [nameData, setNameData] = useState({ daoName: "", chain: "sepolia" });
  const [selectedCurrency, setSelectedCurrency] = useState("usdt");

  const addInput = () => setInputs([...inputs, { address: "", chain: "sepolia" }]);
  const removeInput = (index: number) => setInputs(inputs.filter((_, i) => i !== index));

  const handleInputChange = (index: number, field: "address" | "chain", value: string) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][field] = value;
    setInputs(updatedInputs);
  };

  const handleNameChange = (event: any) => {
    const { name, value } = event.target;
    setNameData(prev => ({ ...prev, [name]: value }));
  };

  const deployContract = async (event: any) => {
    event.preventDefault();
    console.log(nameData.daoName, inputs, selectedCurrency);

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const preferenceAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_primaryAddress",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "_secondaryAddresses",
				"type": "address[]"
			},
			{
				"internalType": "string",
				"name": "_chainPreference",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tokenPreference",
				"type": "string"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "UserRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "secondary",
				"type": "address"
			}
		],
		"name": "getPrimaryAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getUserPreferences",
		"outputs": [
			{
				"internalType": "address",
				"name": "primaryAddress",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "secondaryAddresses",
				"type": "address[]"
			},
			{
				"internalType": "string",
				"name": "chainPreference",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tokenPreference",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "address",
				"name": "primaryAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "chainPreference",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tokenPreference",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
    const contract = new ethers.Contract(
      "0x4957c479BdB135A48310300adacB506BcfB4817b",
      preferenceAbi,
      signer
    );

    const txn = await contract.registerUser(nameData.daoName, inputs.map(i => i.address), "Sepolia", selectedCurrency);
    await txn.wait();
    console.log(txn);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center p-6">
      <h1 className="text-2xl font-semibold">Set your preferences</h1>

      <form onSubmit={deployContract} className="w-full max-w-lg mt-6 p-6 rounded-lg shadow-md">
        <div className="flex gap-2">
          <div className="w-2/3">
            <label className="block text-sm font-medium">Primary Address</label>
            <input
              type="text"
              name="daoName"
              value={nameData.daoName}
              onChange={handleNameChange}
              className="w-full p-2 rounded-md mt-2 bg-black text-white border-2 border-white"
            />
          </div>

          {/* Chain Selector beside Primary Address */}
          <div className="w-1/3">
            <label className="block text-sm font-medium">Chain</label>
            <div className="relative">
              <select
                name="chain"
                value={nameData.chain}
                onChange={handleNameChange}
                className="w-full p-2 rounded-md bg-black text-white border-2 border-white pl-10"
              >
                {chainOptions.map(chain => (
                  <option key={chain.value} value={chain.value}>
                    {chain.label}
                  </option>
                ))}
              </select>
              <img
                src={chainOptions.find(c => c.value === nameData.chain)?.logo}
                alt="Chain Logo"
                className="absolute top-1/2 left-2 transform -translate-y-1/2 w-5 h-5"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          {inputs.map((input, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              {/* Address Input */}
              <input
                type="text"
                placeholder="Enter Secondary Address"
                value={input.address}
                onChange={e => handleInputChange(index, "address", e.target.value)}
                className="w-2/3 p-2 rounded-md bg-black text-white border-2 border-white"
              />

              {/* Chain Selector with Logo */}
              <div className="relative w-1/3">
                <select
                  value={input.chain}
                  onChange={e => handleInputChange(index, "chain", e.target.value)}
                  className="w-full p-2 rounded-md bg-black text-white border-2 border-white pl-10"
                >
                  {chainOptions.map(chain => (
                    <option key={chain.value} value={chain.value}>
                      {chain.label}
                    </option>
                  ))}
                </select>
                <img
                  src={chainOptions.find(c => c.value === input.chain)?.logo}
                  alt="Chain Logo"
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 w-5 h-5"
                />
              </div>

              <button
                type="button"
                onClick={() => removeInput(index)}
                className="px-3 py-2 bg-black text-white border-2 border-white rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addInput}
            className="mt-2 px-3 py-2 bg-black text-white border-2 border-white rounded-md"
          >
            Add Address
          </button>
        </div>

        {/* Asset Selector with Logo */}
        <div className="mt-4">
          <label className="block text-sm font-medium">Preferred Token</label>
          <div className="relative">
            <select
              value={selectedCurrency}
              onChange={e => setSelectedCurrency(e.target.value)}
              className="w-full p-2 rounded-md bg-black text-white border-2 border-white pl-10"
            >
              {assetOptions.map(asset => (
                <option key={asset.value} value={asset.value}>
                  {asset.label}
                </option>
              ))}
            </select>
            <img
              src={assetOptions.find(a => a.value === selectedCurrency)?.logo}
              alt="Asset Logo"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-black text-white border-2 border-white px-3 py-2 rounded-md hover:bg-gray-900"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
}




