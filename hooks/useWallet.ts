'use client'

import { useState, useEffect, useCallback } from 'react'
import { WalletInfo, WalletProvider, getWalletProviders, DEFAULT_NETWORK, isNetworkSupported } from '@/lib/wallet'

interface UseWalletReturn {
  wallet: WalletInfo | null
  isConnecting: boolean
  error: string | null
  connect: (provider: WalletProvider) => Promise<void>
  disconnect: () => void
  switchNetwork: (chainId: number) => Promise<void>
  availableProviders: WalletProvider[]
}

export const useWallet = (): UseWalletReturn => {
  const [wallet, setWallet] = useState<WalletInfo | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [availableProviders, setAvailableProviders] = useState<WalletProvider[]>([])

  // Initialize providers
  useEffect(() => {
    setAvailableProviders(getWalletProviders())
  }, [])

  // Load wallet from session storage
  useEffect(() => {
    const savedWallet = sessionStorage.getItem('connectedWallet')
    if (savedWallet) {
      try {
        setWallet(JSON.parse(savedWallet))
      } catch (error) {
        console.error('Failed to parse saved wallet:', error)
        sessionStorage.removeItem('connectedWallet')
      }
    }
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    const ethereum = (window as any).ethereum
    if (!ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect()
      } else if (wallet && accounts[0] !== wallet.address) {
        // Account changed, reconnect
        const currentProvider = availableProviders.find(p => p.name === 'MetaMask')
        if (currentProvider) {
          connect(currentProvider)
        }
      }
    }

    const handleChainChanged = (chainId: string) => {
      const numericChainId = parseInt(chainId, 16)
      if (wallet) {
        setWallet(prev => prev ? {
          ...prev,
          chainId: numericChainId,
          networkName: isNetworkSupported(numericChainId) ? 
            require('@/lib/wallet').getNetworkName(numericChainId) : 'Unsupported Network'
        } : null)
      }
    }

    ethereum.on('accountsChanged', handleAccountsChanged)
    ethereum.on('chainChanged', handleChainChanged)

    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged)
      ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }, [wallet, availableProviders])

  const connect = useCallback(async (provider: WalletProvider) => {
    setIsConnecting(true)
    setError(null)

    try {
      const walletInfo = await provider.connect()
      setWallet(walletInfo)
      sessionStorage.setItem('connectedWallet', JSON.stringify(walletInfo))
    } catch (error: any) {
      setError(error.message)
      console.error('Wallet connection error:', error)
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setWallet(null)
    setError(null)
    sessionStorage.removeItem('connectedWallet')
  }, [])

  const switchNetwork = useCallback(async (chainId: number) => {
    if (!wallet) return

    try {
      await require('@/lib/wallet').switchNetwork(chainId)
      // The chain change will be handled by the event listener
    } catch (error: any) {
      setError(`Failed to switch network: ${error.message}`)
    }
  }, [wallet])

  return {
    wallet,
    isConnecting,
    error,
    connect,
    disconnect,
    switchNetwork,
    availableProviders
  }
}
