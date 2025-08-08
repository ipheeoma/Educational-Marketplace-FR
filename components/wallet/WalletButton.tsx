'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useWallet } from '@/hooks/useWallet';
import { Wallet, Plug, CircleDollarSign, Network, XCircle, Loader2 } from 'lucide-react';

export function WalletButton() {
  const { wallet, isLoading, connectWallet, disconnectWallet, refreshBalance, switchNetwork } = useWallet();
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  const handleConnect = async (walletType: 'metamask' | 'phantom') => {
    await connectWallet(walletType);
    setIsConnectModalOpen(false);
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
  };

  const handleRefreshBalance = async () => {
    await refreshBalance();
  };

  const handleSwitchNetwork = async (chainId: string) => {
    await switchNetwork(chainId);
  };

  return (
    <>
      {wallet.isConnected ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              {wallet.address ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : 'Connected'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center justify-between">
              <span>Address:</span>
              <span className="font-mono text-xs">
                {wallet.address ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : 'N/A'}
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between">
              <span>Balance:</span>
              <span className="flex items-center gap-1">
                <CircleDollarSign className="h-4 w-4" />
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : `${wallet.balance || '0.00'} ETH`}
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between">
              <span>Network:</span>
              <span className="flex items-center gap-1">
                <Network className="h-4 w-4" />
                {wallet.network || 'N/A'}
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleRefreshBalance} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CircleDollarSign className="h-4 w-4 mr-2" />}
              Refresh Balance
            </DropdownMenuItem>
            {wallet.network !== 'mainnet' && wallet.provider && (
              <DropdownMenuItem onClick={() => handleSwitchNetwork('0x1')} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Network className="h-4 w-4 mr-2" />}
                Switch to Mainnet
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleDisconnect} disabled={isLoading} className="text-red-600">
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Dialog open={isConnectModalOpen} onOpenChange={setIsConnectModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect Your Wallet</DialogTitle>
              <DialogDescription>
                Choose your preferred wallet to connect to EduMarket.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {wallet.error && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{wallet.error}</AlertDescription>
                </Alert>
              )}
              <Button
                variant="outline"
                className="w-full justify-start gap-3 py-6"
                onClick={() => handleConnect('metamask')}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Image src="/metamask-icon.png" alt="Metamask" width={24} height={24} />}
                Connect with Metamask
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 py-6"
                onClick={() => handleConnect('phantom')}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Image src="/phantom-icon.png" alt="Phantom" width={24} height={24} />}
                Connect with Phantom
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
