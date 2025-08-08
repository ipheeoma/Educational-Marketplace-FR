import { useState, useEffect, useCallback } from 'react';
import { connectMetamask, disconnectMetamask, getMetamaskBalance, switchMetamaskNetwork, connectPhantom, disconnectPhantom } from '@/lib/wallet';
import { ethers } from 'ethers';

interface WalletState {
  address: string | null;
  balance: string | null;
  network: string | null;
  isConnected: boolean;
  provider: ethers.BrowserProvider | null;
  error: string | null;
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    balance: null,
    network: null,
    isConnected: false,
    provider: null,
    error: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const resetWalletState = useCallback(() => {
    setWallet({
      address: null,
      balance: null,
      network: null,
      isConnected: false,
      provider: null,
      error: null,
    });
  }, []);

  const connectWallet = useCallback(async (walletType: 'metamask' | 'phantom') => {
    setIsLoading(true);
    setWallet((prev) => ({ ...prev, error: null }));
    try {
      if (walletType === 'metamask') {
        const { address, balance, network, provider } = await connectMetamask();
        setWallet({
          address,
          balance,
          network,
          isConnected: true,
          provider,
          error: null,
        });
      } else if (walletType === 'phantom') {
        const { address, balance, network } = await connectPhantom();
        setWallet({
          address,
          balance,
          network,
          isConnected: true,
          provider: null, // Phantom doesn't use ethers.BrowserProvider directly
          error: null,
        });
      }
    } catch (err: any) {
      setWallet((prev) => ({ ...prev, error: err.message }));
      console.error("Connection error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    setIsLoading(true);
    setWallet((prev) => ({ ...prev, error: null }));
    try {
      if (wallet.provider) {
        await disconnectMetamask(wallet.provider);
      } else if (wallet.network === 'Solana') { // Assuming 'Solana' for Phantom
        await disconnectPhantom();
      }
      resetWalletState();
    } catch (err: any) {
      setWallet((prev) => ({ ...prev, error: err.message }));
      console.error("Disconnection error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [wallet.provider, wallet.network, resetWalletState]);

  const refreshBalance = useCallback(async () => {
    if (wallet.isConnected && wallet.address && wallet.provider) {
      try {
        const newBalance = await getMetamaskBalance(wallet.provider, wallet.address);
        setWallet((prev) => ({ ...prev, balance: newBalance }));
      } catch (err: any) {
        setWallet((prev) => ({ ...prev, error: err.message }));
        console.error("Balance refresh error:", err);
      }
    }
  }, [wallet.isConnected, wallet.address, wallet.provider]);

  const switchNetwork = useCallback(async (chainId: string) => {
    if (wallet.isConnected && wallet.provider) {
      setIsLoading(true);
      setWallet((prev) => ({ ...prev, error: null }));
      try {
        const newNetworkName = await switchMetamaskNetwork(wallet.provider, chainId);
        setWallet((prev) => ({ ...prev, network: newNetworkName }));
      } catch (err: any) {
        setWallet((prev) => ({ ...prev, error: err.message }));
        console.error("Network switch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [wallet.isConnected, wallet.provider]);

  // Listen for Metamask account/network changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined' && wallet.isConnected && wallet.provider) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // Metamask is locked or the user has disconnected all accounts
          resetWalletState();
        } else if (wallet.address !== accounts[0]) {
          // Account changed
          setWallet((prev) => ({ ...prev, address: accounts[0] }));
          refreshBalance();
        }
      };

      const handleChainChanged = (chainId: string) => {
        // Network changed
        if (wallet.provider) {
          wallet.provider.getNetwork().then(network => {
            setWallet((prev) => ({ ...prev, network: network.name }));
            refreshBalance();
          });
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [wallet.isConnected, wallet.address, wallet.provider, refreshBalance, resetWalletState]);

  return {
    wallet,
    isLoading,
    connectWallet,
    disconnectWallet,
    refreshBalance,
    switchNetwork,
  };
}
