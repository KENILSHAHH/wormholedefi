"use client";

import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { Wormhole, wormhole } from "@wormhole-foundation/sdk";
import evm from "@wormhole-foundation/sdk/evm";
import solana from "@wormhole-foundation/sdk/solana";
import sui from "@wormhole-foundation/sdk/sui";
import aptos from "@wormhole-foundation/sdk/aptos";
import { getSigner, getTokenDecimals } from "./helper";

const assetOptions = [
  { value: "usdt", label: "USDT", logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg" },
  { value: "usdc", label: "USDC", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg" },
  { value: "eth", label: "ETH", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" }
];

export default function TokenBridge() {
  const [formData, setFormData] = useState({
    address: "",
    amount: "",
    asset: "usdt"
  });
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBridge = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTxHash("");

    try {
      const wh = await wormhole("Testnet", [evm, solana, sui, aptos]);
      const sendChain = wh.getChain("Sepolia");
      const rcvChain = wh.getChain("BaseSepolia");

      const source = await getSigner(sendChain);
      const destination = await getSigner(rcvChain);

      const token = Wormhole.tokenId(sendChain.chain, "0x811bE4613Af1ce6A0740032Bfd8455d4844898D4");
      const amt = formData.amount;
      const decimals = await getTokenDecimals(wh, token, sendChain);
      const automatic = false;

      const xfer = await wh.tokenTransfer(
        token,
        BigInt(ethers.parseUnits(amt, decimals).toString()),
        source.address,
       destination.address,
        automatic
      );

      const srcTxids = await xfer.initiateTransfer(source.signer);
      setTxHash(srcTxids[0]);
      console.log("Transaction Sent: ", srcTxids[0]);

      await xfer.fetchAttestation(20_00_000);
      const destTxids = await xfer.completeTransfer(destination.signer);
      console.log("Transfer Completed: ", destTxids);

      setTxHash(destTxids[0]);
    } catch (error) {
      console.error("Bridge Error: ", error);
    }

    setLoading(false);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center p-6">
      <h1 className="text-2xl font-semibold">Bridge Tokens</h1>

      <form onSubmit={handleBridge} className="w-full max-w-lg mt-6 p-6 rounded-lg shadow-md">
        {/* Address Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Recipient Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter Destination Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 rounded-md mt-2 bg-black text-white border-2 border-white"
          />
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 rounded-md mt-2 bg-black text-white border-2 border-white"
          />
        </div>

        {/* Asset Selector with Logo */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Select Asset</label>
          <div className="relative">
            <select
              name="asset"
              value={formData.asset}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-black text-white border-2 border-white pl-10"
            >
              {assetOptions.map(asset => (
                <option key={asset.value} value={asset.value}>
                  {asset.label}
                </option>
              ))}
            </select>
            <img
              src={assetOptions.find(a => a.value === formData.asset)?.logo}
              alt="Asset Logo"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full bg-black text-white border-2 border-white px-3 py-2 rounded-md hover:bg-gray-900"
          disabled={loading}
        >
          {loading ? "Bridging..." : "Bridge Tokens"}
        </button>

        {txHash && (
          <p className="text-sm mt-2 text-center">
            ✅ Transaction Hash:{" "}
            <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" className="text-blue-400 underline">
              View on Etherscan
            </a>
          </p>
        )}
      </form>
    </div>
  );
}
