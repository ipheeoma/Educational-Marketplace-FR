import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
    phantom?: {
      solana?: any;
    };
  }
}

export const connectMetamask = async (): Promise<string | null> => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      console.log("MetaMask connected:", address);
      return address;
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      return null;
    }
  } else {
    alert("MetaMask is not installed. Please install it to connect your wallet.");
    return null;
  }
};

export const disconnectMetamask = async (): Promise<void> => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // MetaMask does not have a direct disconnect method via EIP-1193.
      // Disconnecting usually means removing the site's connection in MetaMask UI.
      // For programmatic "disconnection", we might clear accounts or just stop using the provider.
      // Here, we'll just log it and clear any stored state in the app.
      console.log("MetaMask disconnected (session cleared).");
    } catch (error) {
      console.error("Error disconnecting MetaMask:", error);
    }
  }
};

export const getMetamaskBalance = async (address: string): Promise<string | null> => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("Error getting MetaMask balance:", error);
      return null;
    }
  }
  return null;
};

export const switchMetamaskNetwork = async (chainId: string): Promise<boolean> => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainId }],
      });
      return true;
    } catch (error: any) {
      if (error.code === 4902) {
        // Chain not added, try to add it (example for Polygon Mumbai Testnet)
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x13881', // Mumbai Testnet
                chainName: 'Polygon Mumbai Testnet',
                rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
                nativeCurrency: {
                  name: 'MATIC',
                  symbol: 'MATIC',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
              },
            ],
          });
          return true;
        } catch (addError) {
          console.error("Failed to add network:", addError);
          return false;
        }
      }
      console.error("Error switching network:", error);
      return false;
    }
  }
  return false;
};

export const connectPhantom = async (): Promise<string | null> => {
  if (window.phantom?.solana?.isPhantom) {
    try {
      const resp = await window.phantom.solana.connect();
      const address = resp.publicKey.toString();
      console.log("Phantom connected:", address);
      return address;
    } catch (error) {
      console.error("Error connecting to Phantom:", error);
      return null;
    }
  } else {
    alert("Phantom wallet is not installed. Please install it to connect your wallet.");
    window.open('https://phantom.app/', '_blank');
    return null;
  }
};

export const disconnectPhantom = async (): Promise<void> => {
  if (window.phantom?.solana?.isPhantom) {
    try {
      await window.phantom.solana.disconnect();
      console.log("Phantom disconnected.");
    } catch (error) {
      console.error("Error disconnecting Phantom:", error);
    }
  }
};

// WalletConnect integration (requires a WalletConnect provider setup, typically client-side)
// This is a simplified placeholder. A full implementation would involve @web3modal/ethers or similar.
export const connectWalletConnect = async (): Promise<string | null> => {
  alert("WalletConnect integration requires a more complex setup. This is a placeholder.");
  console.log("Attempting to connect WalletConnect (placeholder)");
  return null; // Placeholder for actual WalletConnect address
};

export const disconnectWalletConnect = async (): Promise<void> => {
  console.log("Attempting to disconnect WalletConnect (placeholder)");
};
