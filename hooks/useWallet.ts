import { useState, useEffect, useCallback } from 'react';
import { connectMetaMask, getBalance, shortenAddress, switchNetwork, SUPPORTED_NETWORKS, NetworkId, NetworkInfo } from '@/lib/wallet';

interface WalletState {
  address: string | null;
  chainId: NetworkId | null;
  balance: string | null;
  isConnected: boolean;
  error: string | null;
  networkInfo: NetworkInfo | null;
}

const defaultState: WalletState = {
  address: null,
  chainId: null,
  balance: null,
  isConnected: false,
  error: null,
  networkInfo: null,
};

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>(() => {
    // Initialize from session storage if available
    if (typeof window !== 'undefined') {
      const storedAddress = sessionStorage.getItem('walletAddress');
      const storedChainId = sessionStorage.getItem('walletChainId');
      if (storedAddress && storedChainId) {
        const chainIdNum = Number(storedChainId);
        const networkInfo = SUPPORTED_NETWORKS[chainIdNum as NetworkId];
        return {
          address: storedAddress,
          chainId: chainIdNum as NetworkId,
          balance: null, // Will be fetched on mount
          isConnected: true,
          error: null,
          networkInfo: networkInfo || null,
        };
      }
    }
    return defaultState;
  });

  const updateWalletState = useCallback((updates: Partial<WalletState>) => {
    setWallet(prevState => ({ ...prevState, ...updates }));
  }, []);

  const connectWallet = useCallback(async () => {
    updateWalletState({ error: null });
    try {
      const { address, chainId } = await connectMetaMask();
      const networkInfo = SUPPORTED_NETWORKS[chainId as NetworkId];
      if (!networkInfo) {
        throw new Error(`Unsupported network detected: ${chainId}. Please switch to a supported network like Polygon.`);
      }
      const fetchedBalance = await getBalance(address, chainId);

      sessionStorage.setItem('walletAddress', address);
      sessionStorage.setItem('walletChainId', String(chainId));

      updateWalletState({
        address,
        chainId,
        balance: fetchedBalance,
        isConnected: true,
        networkInfo,
      });
    } catch (err: any) {
      console.error("Failed to connect wallet:", err);
      updateWalletState({ error: err.message || "Failed to connect wallet." });
      disconnectWallet(); // Ensure state is reset on error
    }
  }, [updateWalletState]);

  const disconnectWallet = useCallback(() => {
    sessionStorage.removeItem('walletAddress');
    sessionStorage.removeItem('walletChainId');
    updateWalletState(defaultState);
  }, [updateWalletState]);

  const fetchBalance = useCallback(async () => {
    if (wallet.address && wallet.chainId) {
      try {
        const fetchedBalance = await getBalance(wallet.address, wallet.chainId);
        updateWalletState({ balance: fetchedBalance });
      } catch (err: any) {
        console.error("Failed to fetch balance:", err);
        updateWalletState({ error: err.message || "Failed to fetch balance." });
      }
    }
  }, [wallet.address, wallet.chainId, updateWalletState]);

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      updateWalletState({ address: accounts[0], error: null });
      fetchBalance();
    }
  }, [disconnectWallet, updateWalletState, fetchBalance]);

  const handleChainChanged = useCallback((chainIdHex: string) => {
    const newChainId = Number(chainIdHex);
    const networkInfo = SUPPORTED_NETWORKS[newChainId as NetworkId];
    if (networkInfo) {
      updateWalletState({ chainId: newChainId as NetworkId, networkInfo, error: null });
      fetchBalance();
    } else {
      updateWalletState({
        chainId: newChainId as NetworkId,
        networkInfo: null,
        error: `Unsupported network: ${newChainId}. Please switch to a supported network.`,
      });
      // Optionally, prompt to switch or disconnect
    }
  }, [updateWalletState, fetchBalance]);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      // Initial fetch of balance if already connected via session storage
      if (wallet.isConnected && wallet.address && wallet.chainId && !wallet.balance) {
        fetchBalance();
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [wallet.isConnected, wallet.address, wallet.chainId, wallet.balance, fetchBalance, handleAccountsChanged, handleChainChanged]);

  return {
    ...wallet,
    shortenedAddress: wallet.address ? shortenAddress(wallet.address) : null,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    fetchBalance,
  };
};
