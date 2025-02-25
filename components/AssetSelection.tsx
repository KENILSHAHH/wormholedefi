import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const assets = ["USDC", "USDT", "ETH"]

type AssetSelectionProps = {
  selectedAsset: string
  setSelectedAsset: (asset: string) => void
}

export default function AssetSelection({ selectedAsset, setSelectedAsset }: AssetSelectionProps) {
  return (
    <div className="space-y-4 mt-6">
      <Label>Default Asset</Label>
      <RadioGroup value={selectedAsset} onValueChange={setSelectedAsset}>
        {assets.map((asset) => (
          <div key={asset} className="flex items-center space-x-2">
            <RadioGroupItem value={asset} id={asset} />
            <Label htmlFor={asset}>{asset}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

