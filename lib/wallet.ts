import { ethers } from 'ethers'

declare global {
  interface Window {
    ethereum?: any;
    phantom?: any;
  }
}

export const connectMetamask = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();

      return {
        address,
        balance: ethers.formatEther(balance),
        network: network.name,
        provider,
        signer,
      };
    } catch (error) {
      console.error("Error connecting to Metamask:", error);
      throw new Error("Failed to connect to Metamask.");
    }
  } else {
    throw new Error("Metamask is not installed.");
  }
};

export const disconnectMetamask = async (provider: ethers.BrowserProvider) => {
  if (provider && provider.provider.disconnect) {
    try {
      await provider.provider.disconnect();
      console.log("Metamask disconnected.");
    } catch (error) {
      console.error("Error disconnecting Metamask:", error);
      throw new Error("Failed to disconnect Metamask.");
    }
  }
};

export const getMetamaskBalance = async (provider: ethers.BrowserProvider, address: string) => {
  try {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error("Error getting Metamask balance:", error);
    throw new Error("Failed to get Metamask balance.");
  }
};

export const switchMetamaskNetwork = async (provider: ethers.BrowserProvider, chainId: string) => {
  try {
    await provider.send("wallet_switchEthereumChain", [{ chainId }]);
    const network = await provider.getNetwork();
    return network.name;
  } catch (error: any) {
    if (error.code === 4902) {
      // Chain not added, try to add it
      console.warn(`Network with chainId ${chainId} not found, attempting to add.`);
      // You would typically prompt the user to add the network here
      // For simplicity, we'll just re-throw for now.
      throw new Error(`Network with chainId ${chainId} not found. Please add it manually.`);
    } else {
      console.error("Error switching Metamask network:", error);
      throw new Error("Failed to switch Metamask network.");
    }
  }
};

export const connectPhantom = async () => {
  if (typeof window.phantom?.solana !== 'undefined') {
    try {
      const resp = await window.phantom.solana.connect();
      const publicKey = resp.publicKey.toString();
      // In a real app, you'd fetch balance and network from a Solana RPC
      return {
        address: publicKey,
        balance: 'N/A', // Placeholder, requires Solana RPC call
        network: 'Solana', // Placeholder, requires Solana RPC call
      };
    } catch (error) {
      console.error("Error connecting to Phantom:", error);
      throw new Error("Failed to connect to Phantom.");
    }
  } else {
    throw new Error("Phantom wallet is not installed.");
  }
};

export const disconnectPhantom = async () => {
  if (typeof window.phantom?.solana !== 'undefined') {
    try {
      await window.phantom.solana.disconnect();
      console.log("Phantom disconnected.");
    } catch (error) {
      console.error("Error disconnecting Phantom:", error);
      throw new Error("Failed to disconnect Phantom.");
    }
  }
};
