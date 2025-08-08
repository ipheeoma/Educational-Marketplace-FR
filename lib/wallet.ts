import { ethers } from 'ethers'

// Define supported networks
export const SUPPORTED_NETWORKS = {
  1: { name: 'Ethereum Mainnet', rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID', currency: 'ETH', explorer: 'https://etherscan.io' },
  137: { name: 'Polygon Mainnet', rpcUrl: 'https://polygon-rpc.com', currency: 'MATIC', explorer: 'https://polygonscan.com' },
  56: { name: 'Binance Smart Chain Mainnet', rpcUrl: 'https://bsc-dataseed.binance.org', currency: 'BNB', explorer: 'https://bscscan.com' },
  // Add more networks as needed
} as const;

export type NetworkId = keyof typeof SUPPORTED_NETWORKS;
export type NetworkInfo = typeof SUPPORTED_NETWORKS[NetworkId];

// Helper to get network info by ID
export const getNetworkInfo = (chainId: number): NetworkInfo | undefined => {
  return SUPPORTED_NETWORKS[chainId as NetworkId];
};

// Function to shorten wallet address for display
export const shortenAddress = (address: string, chars = 4): string => {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
};

// Function to connect to MetaMask
export const connectMetaMask = async (): Promise<{ address: string; chainId: number } | null> => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed!');
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const network = await provider.getNetwork();

    if (accounts.length === 0) {
      throw new Error('No accounts found or connected.');
    }

    const address = accounts[0];
    const chainId = Number(network.chainId);

    return { address, chainId };
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
    throw error;
  }
};

// Function to get wallet balance
export const getBalance = async (address: string, chainId: number): Promise<string> => {
  const networkInfo = getNetworkInfo(chainId);
  if (!networkInfo) {
    throw new Error(`Unsupported network: ${chainId}`);
  }

  try {
    const provider = new ethers.JsonRpcProvider(networkInfo.rpcUrl);
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error("Error fetching balance:", error);
    return '0.0';
  }
};

// Function to switch network
export const switchNetwork = async (chainId: NetworkId): Promise<boolean> => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed!');
  }

  const networkInfo = getNetworkInfo(chainId);
  if (!networkInfo) {
    throw new Error(`Network with ID ${chainId} is not supported.`);
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ethers.toBeHex(chainId) }],
    });
    return true;
  } catch (error: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: ethers.toBeHex(chainId),
              chainName: networkInfo.name,
              rpcUrls: [networkInfo.rpcUrl],
              nativeCurrency: {
                name: networkInfo.currency,
                symbol: networkInfo.currency,
                decimals: 18,
              },
              blockExplorerUrls: [networkInfo.explorer],
            },
          ],
        });
        return true;
      } catch (addError) {
        console.error("Error adding network:", addError);
        throw addError;
      }
    }
    console.error("Error switching network:", error);
    throw error;
  }
};

// Type for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
