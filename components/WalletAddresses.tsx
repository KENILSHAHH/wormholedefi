"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ethers } from "ethers"
import { PlusCircle, X, Star } from "lucide-react"

const chainLogos: { [key: string]: string } = {
  ethereum: "/ethereum-logo.svg",
  solana: "/solana-logo.svg",
  aptos: "/aptos-logo.svg",
  // Add more chain logos as needed
}

type WalletAddressesProps = {
  wallets: { address: string; chain: string }[]
  addWallet: (address: string, chain: string) => void
  removeWallet: (index: number) => void
  setAsDefault: (address: string) => void
  defaultWallet: string
}

export default function WalletAddresses({
  wallets,
  addWallet,
  removeWallet,
  setAsDefault,
  defaultWallet,
}: WalletAddressesProps) {
  const [newAddress, setNewAddress] = useState("")
  const [newChain, setNewChain] = useState("")

  const handleAddWallet = () => {
    if (ethers.isAddress(newAddress)) {
      addWallet(newAddress, newChain || detectChain(newAddress))
      setNewAddress("")
      setNewChain("")
    } else {
      alert("Invalid address")
    }
  }

  const detectChain = (address: string) => {
    // Implement chain detection logic here
    // For simplicity, we'll just return 'ethereum' for now
    return "ethereum"
  }

  return (
    <div className="space-y-4">
      <Label>Wallet Addresses</Label>
      {wallets.map((wallet, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input value={wallet.address} readOnly />
          <div className="flex items-center space-x-1">
            <img src={chainLogos[wallet.chain] || "/placeholder.svg"} alt={wallet.chain} className="w-6 h-6" />
            <span>{wallet.chain}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => removeWallet(index)}>
            <X className="h-4 w-4" />
          </Button>
          <Button
            variant={defaultWallet === wallet.address ? "default" : "outline"}
            size="icon"
            onClick={() => setAsDefault(wallet.address)}
          >
            <Star className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <div className="flex space-x-2">
        <Input placeholder="Enter wallet address" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
        <Input placeholder="Chain (optional)" value={newChain} onChange={(e) => setNewChain(e.target.value)} />
        <Button onClick={handleAddWallet}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
  )
}

