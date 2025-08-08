'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useWallet, WalletType } from '@/hooks/useWallet'
import { Wallet, ChevronDown, Plug, CircleAlert, XCircle } from 'lucide-react'
import Image from 'next/image'

export function WalletButton() {
  const { address, balance, walletType, isConnected, isLoading, error, connectWallet, disconnectWallet, switchNetwork } = useWallet()
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false)

  const handleConnect = async (type: WalletType) => {
    await connectWallet(type)
    setIsConnectModalOpen(false)
  }

  const handleDisconnect = async () => {
    await disconnectWallet()
  }

  const handleSwitchNetwork = async (chainId: string) => {
    await switchNetwork(chainId)
  }

  return (
    <>
      {isConnected ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {address && (
              <DropdownMenuItem className="flex flex-col items-start">
                <span className="text-sm text-gray-500">Address:</span>
                <span className="font-mono text-xs">{address}</span>
              </DropdownMenuItem>
            )}
            {balance && (
              <DropdownMenuItem>
                <span className="text-sm text-gray-500">Balance:</span>
                <span className="font-semibold ml-auto">{parseFloat(balance).toFixed(4)} ETH</span>
              </DropdownMenuItem>
            )}
            {walletType && (
              <DropdownMenuItem>
                <span className="text-sm text-gray-500">Wallet Type:</span>
                <span className="capitalize ml-auto">{walletType}</span>
              </DropdownMenuItem>
            )}
            {walletType === 'metamask' && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Network</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleSwitchNetwork('0x1')}>
                  Ethereum Mainnet
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSwitchNetwork('0xaa36a7')}>
                  Sepolia Testnet
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSwitchNetwork('0x13881')}>
                  Polygon Mumbai Testnet
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDisconnect} className="text-red-600">
              <XCircle className="w-4 h-4 mr-2" /> Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Dialog open={isConnectModalOpen} onOpenChange={setIsConnectModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" disabled={isLoading}>
              <Plug className="w-4 h-4 mr-2" />
              {isLoading ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Connect Wallet</DialogTitle>
              <DialogDescription>
                Choose your preferred wallet to connect.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {error && (
                <Alert variant="destructive">
                  <CircleAlert className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12 text-base"
                onClick={() => handleConnect('metamask')}
                disabled={isLoading}
              >
                <Image src="/metamask-icon.png" alt="MetaMask" width={24} height={24} />
                MetaMask
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12 text-base"
                onClick={() => handleConnect('phantom')}
                disabled={isLoading}
              >
                <Image src="/phantom-icon.png" alt="Phantom" width={24} height={24} />
                Phantom
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12 text-base"
                onClick={() => handleConnect('walletconnect')}
                disabled={isLoading}
              >
                <Wallet className="w-6 h-6 text-blue-500" />
                WalletConnect
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
