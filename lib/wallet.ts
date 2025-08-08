import { ethers } from 'ethers'

export interface WalletInfo {
  address: string
  chainId: number
  networkName: string
  balance?: string
}

export interface WalletProvider {
  name: string
  icon: string
  isInstalled: boolean
  connect: () => Promise<WalletInfo>
  disconnect: () => void
}

// Supported networks
export const SUPPORTED_NETWORKS = {
  137: {
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com/',
    symbol: 'MATIC',
    blockExplorer: 'https://polygonscan.com/'
  },
  1: {
    name: 'Ethereum',
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
    symbol: 'ETH',
    blockExplorer: 'https://etherscan.io/'
  },
  56: {
    name: 'BSC',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    symbol: 'BNB',
    blockExplorer: 'https://bscscan.com/'
  }
}

export const DEFAULT_NETWORK = 137 // Polygon

// Utility functions
export const shortenAddress = (address: string): string => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const getNetworkName = (chainId: number): string => {
  return SUPPORTED_NETWORKS[chainId as keyof typeof SUPPORTED_NETWORKS]?.name || 'Unknown Network'
}

export const isNetworkSupported = (chainId: number): boolean => {
  return chainId in SUPPORTED_NETWORKS
}

// MetaMask provider
export const createMetaMaskProvider = (): WalletProvider => ({
  name: 'MetaMask',
  icon: '🦊',
  isInstalled: typeof window !== 'undefined' && !!(window as any).ethereum?.isMetaMask,
  
  connect: async (): Promise<WalletInfo> => {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      throw new Error('MetaMask not installed')
    }

    const ethereum = (window as any).ethereum
    
    try {
      // Request account access
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found')
      }

      // Get chain ID
      const chainId = await ethereum.request({
        method: 'eth_chainId'
      })

      const numericChainId = parseInt(chainId, 16)

      // Switch to default network if not supported
      if (!isNetworkSupported(numericChainId)) {
        await switchNetwork(DEFAULT_NETWORK)
      }

      // Get balance
      const provider = new ethers.BrowserProvider(ethereum)
      const balance = await provider.getBalance(accounts[0])
      const formattedBalance = ethers.formatEther(balance)

      return {
        address: accounts[0],
        chainId: numericChainId,
        networkName: getNetworkName(numericChainId),
        balance: parseFloat(formattedBalance).toFixed(4)
      }
    } catch (error: any) {
      throw new Error(`Failed to connect MetaMask: ${error.message}`)
    }
  },

  disconnect: () => {
    // MetaMask doesn't have a programmatic disconnect
    // We'll handle this in the app state
  }
})

// WalletConnect provider (simplified)
export const createWalletConnectProvider = (): WalletProvider => ({
  name: 'WalletConnect',
  icon: '🔗',
  isInstalled: true, // WalletConnect works through QR code
  
  connect: async (): Promise<WalletInfo> => {
    // This would integrate with WalletConnect SDK
    // For now, we'll show a placeholder
    throw new Error('WalletConnect integration coming soon')
  },

  disconnect: () => {
    // WalletConnect disconnect logic
  }
})

// Phantom provider (for Solana)
export const createPhantomProvider = (): WalletProvider => ({
  name: 'Phantom',
  icon: '👻',
  isInstalled: typeof window !== 'undefined' && !!(window as any).solana?.isPhantom,
  
  connect: async (): Promise<WalletInfo> => {
    if (typeof window === 'undefined' || !(window as any).solana) {
      throw new Error('Phantom wallet not installed')
    }

    const solana = (window as any).solana
    
    try {
      const response = await solana.connect()
      
      return {
        address: response.publicKey.toString(),
        chainId: 0, // Solana doesn't use chainId
        networkName: 'Solana',
        balance: '0' // Would need Solana RPC to get balance
      }
    } catch (error: any) {
      throw new Error(`Failed to connect Phantom: ${error.message}`)
    }
  },

  disconnect: async () => {
    if (typeof window !== 'undefined' && (window as any).solana) {
      await (window as any).solana.disconnect()
    }
  }
})

// Network switching utility
export const switchNetwork = async (chainId: number): Promise<void> => {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    throw new Error('No wallet found')
  }

  const ethereum = (window as any).ethereum
  const hexChainId = `0x${chainId.toString(16)}`

  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hexChainId }]
    })
  } catch (error: any) {
    // If network doesn't exist, add it
    if (error.code === 4902) {
      const network = SUPPORTED_NETWORKS[chainId as keyof typeof SUPPORTED_NETWORKS]
      if (network) {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: hexChainId,
            chainName: network.name,
            rpcUrls: [network.rpcUrl],
            nativeCurrency: {
              name: network.symbol,
              symbol: network.symbol,
              decimals: 18
            },
            blockExplorerUrls: [network.blockExplorer]
          }]
        })
      }
    } else {
      throw error
    }
  }
}

// Get all available providers
export const getWalletProviders = (): WalletProvider[] => {
  return [
    createMetaMaskProvider(),
    createWalletConnectProvider(),
    createPhantomProvider()
  ]
}
