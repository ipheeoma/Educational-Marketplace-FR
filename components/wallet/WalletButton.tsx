'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Wallet, ChevronDown, Copy, ExternalLink, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { useWallet } from '@/hooks/useWallet'
import { shortenAddress, SUPPORTED_NETWORKS, DEFAULT_NETWORK } from '@/lib/wallet'

export function WalletButton() {
  const { wallet, isConnecting, error, connect, disconnect, switchNetwork, availableProviders } = useWallet()
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyAddress = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const openBlockExplorer = () => {
    if (wallet?.address && wallet?.chainId) {
      const network = SUPPORTED_NETWORKS[wallet.chainId as keyof typeof SUPPORTED_NETWORKS]
      if (network) {
        window.open(`${network.blockExplorer}address/${wallet.address}`, '_blank')
      }
    }
  }

  const handleConnect = async (providerName: string) => {
    const provider = availableProviders.find(p => p.name === providerName)
    if (provider) {
      await connect(provider)
      setShowWalletModal(false)
    }
  }

  const isNetworkSupported = wallet?.chainId && wallet.chainId in SUPPORTED_NETWORKS

  if (wallet) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-2">
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">{shortenAddress(wallet.address)}</span>
            <div className="flex items-center space-x-1">
              {isNetworkSupported ? (
                <div className="w-2 h-2 bg-green-500 rounded-full" />
              ) : (
                <div className="w-2 h-2 bg-red-500 rounded-full" />
              )}
              <ChevronDown className="w-3 h-3" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <div className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Connected Wallet</span>
              {isNetworkSupported ? (
                <Badge variant="secondary" className="text-green-600 bg-green-50">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {wallet.networkName}
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Unsupported
                </Badge>
              )}
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              {wallet.address}
            </div>
            {wallet.balance && (
              <div className="text-sm">
                Balance: {wallet.balance} {SUPPORTED_NETWORKS[wallet.chainId as keyof typeof SUPPORTED_NETWORKS]?.symbol || 'ETH'}
              </div>
            )}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
            <Copy className="w-4 h-4 mr-2" />
            {copied ? 'Copied!' : 'Copy Address'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openBlockExplorer} className="cursor-pointer">
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Explorer
          </DropdownMenuItem>
          {!isNetworkSupported && (
            <DropdownMenuItem 
              onClick={() => switchNetwork(DEFAULT_NETWORK)} 
              className="cursor-pointer text-blue-600"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Switch to Polygon
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={disconnect} className="cursor-pointer text-red-600">
            <Wallet className="w-4 h-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Dialog open={showWalletModal} onOpenChange={setShowWalletModal}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={isConnecting}>
          {isConnecting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-3">
            {availableProviders.map((provider) => (
              <Card 
                key={provider.name}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  !provider.isInstalled ? 'opacity-50' : ''
                }`}
                onClick={() => provider.isInstalled && handleConnect(provider.name)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{provider.icon}</span>
                      <div>
                        <div className="font-medium">{provider.name}</div>
                        {!provider.isInstalled && (
                          <div className="text-xs text-muted-foreground">Not installed</div>
                        )}
                      </div>
                    </div>
                    {provider.isInstalled ? (
                      <Button size="sm">Connect</Button>
                    ) : (
                      <Button size="sm" variant="outline" asChild>
                        <a 
                          href={getInstallUrl(provider.name)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Install
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-xs text-muted-foreground text-center space-y-2">
            <p>By connecting a wallet, you agree to our Terms of Service.</p>
            <p>Your wallet address will be stored in your session only.</p>
            <p>Default network: Polygon (for lower fees)</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function getInstallUrl(walletName: string): string {
  switch (walletName) {
    case 'MetaMask':
      return 'https://metamask.io/download/'
    case 'Phantom':
      return 'https://phantom.app/download'
    default:
      return '#'
  }
}
