import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type SavePreferencesProps = {
  preferences: {
    primaryAddress: string
    secondaryAddresses: string[]
    chainPreference: string
    tokenPreference: string
  }
}

export default function SavePreferences({ preferences }: SavePreferencesProps) {
  const chainLogos: { [key: string]: string } = {
    ethereum: "/ethereum-logo.svg",
    solana: "/solana-logo.svg",
    aptos: "/aptos-logo.svg",
    // Add more chain logos as needed
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Saved Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Primary Address:</strong> {preferences.primaryAddress}
          </p>
          <p>
            <strong>Secondary Addresses:</strong>
          </p>
          <ul className="list-disc pl-5">
            {preferences.secondaryAddresses.map((address, index) => (
              <li key={index}>{address}</li>
            ))}
          </ul>
          <div className="flex items-center space-x-2">
            <strong>Chain Preference:</strong>
            <img
              src={chainLogos[preferences.chainPreference] || "/placeholder.svg"}
              alt={preferences.chainPreference}
              className="w-6 h-6"
            />
            <span>{preferences.chainPreference}</span>
          </div>
          <p>
            <strong>Token Preference:</strong> {preferences.tokenPreference}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

