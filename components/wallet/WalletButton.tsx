'use client'

import { useWallet } from '@/hooks/useWallet'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Wallet, Plug, XCircle, CheckCircle, Copy, ExternalLink, Network } from 'lucide-react'
import { useState } from 'react'
import { SUPPORTED_NETWORKS } from '@/lib/wallet'

export function WalletButton() {
  const { address, shortenedAddress, balance, isConnected, error, networkInfo, connectWallet, disconnectWallet, switchNetwork } = useWallet()
  const [isNetworkDialogOpen, setIsNetworkDialogOpen] = useState(false)

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      // Optionally, show a toast notification
      console.log('Address copied to clipboard!')
    }
  }

  const handleSwitchNetwork = async (chainId: number) => {
    try {
      await switchNetwork(chainId)
      setIsNetworkDialogOpen(false)
    } catch (err) {
      console.error('Failed to switch network:', err)
      // Error message is already handled by useWallet hook
    }
  }

  return (
    <>
      {isConnected ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              {shortenedAddress}
              {networkInfo && (
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${networkInfo.name === 'Polygon Mainnet' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {networkInfo.name}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                <span>My Wallet</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center justify-between">
              <span>Address:</span>
              <span className="font-mono text-sm">{shortenedAddress}</span>
              <Button variant="ghost" size="icon" onClick={handleCopyAddress} className="ml-2 h-6 w-6">
                <Copy className="w-3 h-3" />
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Balance:</span>
              <span className="font-semibold ml-auto">{balance ? `${parseFloat(balance).toFixed(4)} ${networkInfo?.currency || ''}` : 'Loading...'}</span>
            </DropdownMenuItem>
            {networkInfo && (
              <DropdownMenuItem>
                <span>Network:</span>
                <span className={`ml-auto flex items-center gap-1 ${networkInfo.name === 'Polygon Mainnet' ? 'text-green-600' : 'text-red-600'}`}>
                  <Network className="w-3 h-3" />
                  {networkInfo.name}
                </span>
              </DropdownMenuItem>
            )}
            {address && networkInfo?.explorer && (
              <DropdownMenuItem asChild>
                <a href={`${networkInfo.explorer}/address/${address}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between cursor-pointer">
                  View on Explorer
                  <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsNetworkDialogOpen(true)} className="cursor-pointer">
              <Network className="w-4 h-4 mr-2" />
              Switch Network
            </DropdownMenuItem>
            <DropdownMenuItem onClick={disconnectWallet} className="text-red-600 cursor-pointer">
              <XCircle className="w-4 h-4 mr-2" />
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={connectWallet} className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
          <Plug className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Dialog open={isNetworkDialogOpen} onOpenChange={setIsNetworkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Switch Network</DialogTitle>
            <DialogDescription>
              Please select a network to connect to. Polygon Mainnet is recommended for low fees.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            {Object.entries(SUPPORTED_NETWORKS).map(([chainId, info]) => (
              <Button
                key={chainId}
                variant={networkInfo?.chainId === Number(chainId) ? 'default' : 'outline'}
                onClick={() => handleSwitchNetwork(Number(chainId))}
                disabled={networkInfo?.chainId === Number(chainId)}
                className="justify-start"
              >
                {info.name}
                {networkInfo?.chainId === Number(chainId) && <CheckCircle className="w-4 h-4 ml-auto text-green-500" />}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
