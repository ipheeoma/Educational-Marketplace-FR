import { useState, useEffect, useCallback } from 'react';
import { connectMetamask, disconnectMetamask, getMetamaskBalance, switchMetamaskNetwork, connectPhantom, disconnectPhantom, connectWalletConnect, disconnectWalletConnect } from '@/lib/wallet';
import { ethers } from 'ethers';

export type WalletType = 'metamask' | 'walletconnect' | 'phantom' | null;

interface WalletState {
  address: string | null;
  balance: string | null;
  walletType: WalletType;
  chainId: string | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    balance: null,
    walletType: null,
    chainId: null,
    isConnected: false,
    isLoading: false,
    error: null,
  });

  const updateWalletState = useCallback(async (
    newAddress: string | null,
    newWalletType: WalletType,
    newChainId: string | null
  ) => {
    setWallet(prev => ({ ...prev, isLoading: true, error: null }));
    let balance = null;
    if (newAddress && newWalletType === 'metamask') {
      balance = await getMetamaskBalance(newAddress);
    }
    setWallet({
      address: newAddress,
      balance,
      walletType: newWalletType,
      chainId: newChainId,
      isConnected: !!newAddress,
      isLoading: false,
      error: null,
    });
  }, []);

  const connectWallet = useCallback(async (type: WalletType) => {
    setWallet(prev => ({ ...prev, isLoading: true, error: null }));
    let address: string | null = null;
    let chainId: string | null = null;

    try {
      if (type === 'metamask') {
        address = await connectMetamask();
        if (address && window.ethereum) {
          chainId = window.ethereum.chainId;
        }
      } else if (type === 'phantom') {
        address = await connectPhantom();
        // Phantom (Solana) doesn't have a chainId like EVM, but we can infer network if needed
        chainId = 'solana'; // Placeholder for Solana network
      } else if (type === 'walletconnect') {
        address = await connectWalletConnect();
        // WalletConnect would typically provide chainId upon connection
        chainId = 'unknown'; // Placeholder
      }
      await updateWalletState(address, type, chainId);
    } catch (err: any) {
      console.error("Failed to connect wallet:", err);
      setWallet(prev => ({ ...prev, isLoading: false, error: err.message || "Failed to connect wallet" }));
    }
  }, [updateWalletState]);

  const disconnectWallet = useCallback(async () => {
    setWallet(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      if (wallet.walletType === 'metamask') {
        await disconnectMetamask();
      } else if (wallet.walletType === 'phantom') {
        await disconnectPhantom();
      } else if (wallet.walletType === 'walletconnect') {
        await disconnectWalletConnect();
      }
      await updateWalletState(null, null, null);
    } catch (err: any) {
      console.error("Failed to disconnect wallet:", err);
      setWallet(prev => ({ ...prev, isLoading: false, error: err.message || "Failed to disconnect wallet" }));
    }
  }, [wallet.walletType, updateWalletState]);

  const switchNetwork = useCallback(async (chainId: string) => {
    if (wallet.walletType === 'metamask') {
      setWallet(prev => ({ ...prev, isLoading: true, error: null }));
      const success = await switchMetamaskNetwork(chainId);
      if (success) {
        // Re-fetch state after successful switch
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await getMetamaskBalance(address);
        setWallet(prev => ({
          ...prev,
          address,
          balance,
          chainId,
          isLoading: false,
          error: null,
        }));
      } else {
        setWallet(prev => ({ ...prev, isLoading: false, error: "Failed to switch network" }));
      }
    } else {
      setWallet(prev => ({ ...prev, error: "Network switching only supported for MetaMask" }));
    }
  }, [wallet.walletType]);

  // Effect to listen for MetaMask account/chain changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined' && wallet.walletType === 'metamask') {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Accounts changed:", accounts);
        updateWalletState(accounts[0] || null, 'metamask', wallet.chainId);
      };

      const handleChainChanged = (chainId: string) => {
        console.log("Chain changed:", chainId);
        updateWalletState(wallet.address, 'metamask', chainId);
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Cleanup
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [wallet.address, wallet.chainId, wallet.walletType, updateWalletState]);

  // Effect to check initial connection on load
  useEffect(() => {
    const checkInitialConnection = async () => {
      setWallet(prev => ({ ...prev, isLoading: true }));
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            const address = accounts[0].address;
            const chainId = window.ethereum.chainId;
            await updateWalletState(address, 'metamask', chainId);
          }
        } catch (error) {
          console.error("Error checking initial MetaMask connection:", error);
        }
      }
      // Add similar checks for Phantom if needed
      setWallet(prev => ({ ...prev, isLoading: false }));
    };
    checkInitialConnection();
  }, [updateWalletState]);

  return {
    ...wallet,
    connectWallet,
    disconnectWallet,
    switchNetwork,
  };
}
