"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Zap, Shield, Coins, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <Features />
      <UseCases />
      <HowItWorks />
      <Partners />
      <CTA />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="container mx-auto py-6 flex justify-between items-center border-b border-white/10">
      <div className="text-2xl font-bold">FluidBridge</div>
      <nav className="space-x-6">
        <a href="#features" className="hover:text-gray-400 transition-colors">
          Features
        </a>
        <a href="#use-cases" className="hover:text-gray-400 transition-colors">
          Use Cases
        </a>
        <a href="#how-it-works" className="hover:text-gray-400 transition-colors">
          How It Works
        </a>
        <Link href="/wallet-preferences">
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
            Wallet Preferences
          </Button>
        </Link>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="container mx-auto py-20 text-center">
      <motion.h1
        className="text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Unleash the Power of Cross-Chain Liquidity
      </motion.h1>
      <motion.p
        className="text-xl mb-10 max-w-2xl mx-auto text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        FluidBridge empowers users to focus their liquidity on their preferred chains and assets, revolutionizing DeFi
        experiences across ecosystems.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Button size="lg" className="mr-4 bg-white text-black hover:bg-gray-200">
          Explore FluidBridge
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
          Watch Demo
        </Button>
      </motion.div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: Zap, title: "Instant Liquidity Transfer", description: "Move your assets across chains in seconds" },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Built on robust smart contracts with multi-layer security",
    },
    { icon: Coins, title: "Asset Flexibility", description: "Support for a wide range of tokens and chains" },
    {
      icon: RefreshCw,
      title: "Automated Rebalancing",
      description: "Optimize your portfolio across chains effortlessly",
    },
  ]

  return (
    <section id="features" className="container mx-auto py-20">
      <h2 className="text-4xl font-bold mb-12 text-center">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="border border-white/10 p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <feature.icon className="h-12 w-12 mb-4 text-white" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function UseCases() {
  const [activeCase, setActiveCase] = useState(0)
  const cases = [
    {
      title: "Cross-Chain DEX Aggregation",
      description:
        "Enable users to swap tokens across different chains, automatically routing to the best liquidity sources.",
      example: "Swap ETH on Ethereum for USDC on Solana with optimal rates and minimal steps.",
    },
    {
      title: "Smart Wallet Liquidity Management",
      description:
        "Empower wallets to intelligently distribute users' assets across chains based on their preferences and market conditions.",
      example:
        "Automatically rebalance a user's portfolio to maintain 60% on Ethereum and 40% on Solana, adjusting for price fluctuations.",
    },
    {
      title: "DeFi Yield Optimization",
      description:
        "Maximize returns by automatically moving liquidity to the highest-yielding protocols across different chains.",
      example: "Shift stablecoin liquidity from Aave on Ethereum to Solend on Solana when yields are more attractive.",
    },
    {
      title: "Cross-Chain Collateral Management",
      description: "Allow users to borrow on one chain using collateral from another, optimizing capital efficiency.",
      example: "Use ETH on Ethereum as collateral to borrow USDC on Solana, taking advantage of lower interest rates.",
    },
  ]

  return (
    <section id="use-cases" className="container mx-auto py-20">
      <h2 className="text-4xl font-bold mb-12 text-center">Transformative Use Cases</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          {cases.map((c, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-lg cursor-pointer mb-4 ${
                activeCase === index ? "bg-white text-black" : "border border-white/10"
              }`}
              onClick={() => setActiveCase(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-semibold">{c.title}</h3>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="w-full md:w-2/3 border border-white/10 p-6 rounded-lg"
          key={activeCase}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4">{cases[activeCase].title}</h3>
          <p className="mb-4 text-gray-400">{cases[activeCase].description}</p>
          <div className="border border-white/10 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Example:</h4>
            <p className="text-gray-400">{cases[activeCase].example}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { title: "Connect", description: "Integrate FluidBridge into your DApp or wallet" },
    { title: "Configure", description: "Set user preferences for chains and assets" },
    { title: "Execute", description: "FluidBridge handles cross-chain transfers and swaps" },
    { title: "Optimize", description: "Continuous rebalancing based on user preferences and market conditions" },
  ]

  return (
    <section id="how-it-works" className="container mx-auto py-20">
      <h2 className="text-4xl font-bold mb-12 text-center">How FluidBridge Works</h2>
      <div className="relative">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex items-start mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="bg-white text-black rounded-full p-3 mr-4">
              <span className="font-bold">{index + 1}</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          </motion.div>
        ))}
        <div className="absolute left-[1.4rem] top-0 bottom-0 w-0.5 bg-white/20" style={{ zIndex: -1 }} />
      </div>
    </section>
  )
}

function Partners() {
  const partners = ["Uniswap", "Aave", "Compound", "Solana", "Avalanche", "Polygon"]

  return (
    <section className="container mx-auto py-20">
      <h2 className="text-4xl font-bold mb-12 text-center">Integration Partners</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            className="border border-white/10 p-4 rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <span className="text-xl font-semibold">{partner}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="container mx-auto py-20 text-center">
      <h2 className="text-4xl font-bold mb-6">Ready to Revolutionize Cross-Chain Liquidity?</h2>
      <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-400">
        Join the growing ecosystem of DApps, wallets, and DeFi platforms leveraging FluidBridge to provide unparalleled
        liquidity management to their users.
      </p>
      <Button size="lg" className="mr-4 bg-white text-black hover:bg-gray-200">
        Get Started
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
        Contact Sales
      </Button>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-2xl font-bold mb-4 md:mb-0">FluidBridge</div>
        <nav className="flex space-x-6">
          <a href="#" className="hover:text-gray-400 transition-colors">
            About
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            Documentation
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            GitHub
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            Contact
          </a>
        </nav>
      </div>
      <div className="container mx-auto mt-8 text-center text-gray-500">© 2023 FluidBridge. All rights reserved.</div>
    </footer>
  )
}

