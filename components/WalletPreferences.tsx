import { useState } from "react"
import { ethers } from "ethers"
import WalletAddresses from "./WalletAddresses"
import AssetSelection from "./AssetSelection"
import SavePreferences from "./SavePreferences"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const contractABI = [
  "function registerUser(address _primaryAddress, address[] memory _secondaryAddresses, string memory _chainPreference, string memory _tokenPreference) public",
  "function getUserPreferences(address _userAddress) public view returns (address primaryAddress, address[] memory secondaryAddresses, string memory chainPreference, string memory tokenPreference)",
]
const contractAddress = "0x1234567890123456789012345678901234567890" // Replace with actual contract address

export default function WalletPreferences() {
  const [wallets, setWallets] = useState<{ address: string; chain: string }[]>([])
  const [defaultWallet, setDefaultWallet] = useState<string>("")
  const [selectedAsset, setSelectedAsset] = useState<string>("USDC")
  const [savedPreferences, setSavedPreferences] = useState<any>(null)

  const addWallet = (address: string, chain: string) => {
    setWallets([...wallets, { address, chain }])
  }

  const removeWallet = (index: number) => {
    const newWallets = [...wallets]
    newWallets.splice(index, 1)
    setWallets(newWallets)
  }

  const setAsDefault = (address: string) => {
    setDefaultWallet(address)
  }

  const savePreferences = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)w
      const primaryAddress = defaultWallet
      const secondaryAddresses = wallets.map((w) => w.address).filter((a) => a !== defaultWallet)
      const chainPreference = wallets.find((w) => w.address === defaultWallet)?.chain || ""
      const tokenPreference = selectedAsset

      await contract.registerUser(primaryAddress, secondaryAddresses, chainPreference, tokenPreference)

      const preferences = await contract.getUserPreferences(await signer.getAddress())
      setSavedPreferences(preferences)
    } catch (error) {
      console.error("Error saving preferences:", error)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Wallet Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <WalletAddresses
          wallets={wallets}
          addWallet={addWallet}
          removeWallet={removeWallet}
          setAsDefault={setAsDefault}
          defaultWallet={defaultWallet}
        />
        <AssetSelection selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} />
        <Button onClick={savePreferences} className="mt-4 w-full">
          Save Preferences
        </Button>
        {savedPreferences && <SavePreferences preferences={savedPreferences} />}
      </CardContent>
    </Card>
  )
}

