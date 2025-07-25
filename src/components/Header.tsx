import React, { useState, useEffect } from 'react';
import { ShieldAlert, Zap, Lock, Cpu, Database, Wallet } from 'lucide-react';

export const Header: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');

  // Wallet connection logic remains the same
  useEffect(() => {
    if (window.ethereum) {
      checkWalletConnection();
      setupEventListeners();
    }
  }, []);

  const checkWalletConnection = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setIsConnected(true);
        setWalletAddress(accounts[0]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to check wallet connection');
    }
  };

  const setupEventListeners = () => {
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length > 0) {
        setIsConnected(true);
        setWalletAddress(accounts[0]);
      } else {
        setIsConnected(false);
        setWalletAddress('');
      }
    });

    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError('Please install MetaMask!');
        return;
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      setIsConnected(true);
      setWalletAddress(accounts[0]);
      setError('');
    } catch (err) {
      console.error(err);
      setError('User denied account access');
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="bg-dark-900 text-metal-100 py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo and Title */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-gradient-to-r from-neon-blue to-neon-purple p-3 rounded-xl mr-4">
            <ShieldAlert className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
              BLOCKSECURE
            </h1>
            <p className="text-metal-400 font-mono text-sm mt-1">
              IMMUTABLE FILE VERIFICATION SYSTEM
            </p>
          </div>
        </div>

        {/* Wallet Connection */}
        <div className="mb-10">
          <button
            onClick={connectWallet}
            className={`px-6 py-3 rounded-lg font-mono text-sm ${
              isConnected
                ? 'bg-dark-700 border border-radium-400 text-radium-400'
                : 'bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:shadow-glow-sm'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Wallet className="w-5 h-5" />
              {isConnected ? formatAddress(walletAddress) : 'CONNECT WALLET'}
            </div>
          </button>
          {error && (
            <p className="text-red-400 text-sm mt-2 font-mono">{error}</p>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: Lock,
              title: "TAMPER-PROOF",
              description: "Blockchain-verified integrity with SHA-256 hashing",
              color: "text-neon-blue"
            },
            {
              icon: Cpu,
              title: "SMART CONTRACTS",
              description: "Automated verification with immutable audit logs",
              color: "text-radium-400"
            },
            {
              icon: Zap,
              title: "REAL-TIME",
              description: "Live blockchain monitoring with instant alerts",
              color: "text-neon-purple"
            },
            {
              icon: Database,
              title: "ENTERPRISE",
              description: "HIPAA & GDPR compliant solutions",
              color: "text-cyan-400"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-dark-800 p-6 rounded-lg border border-dark-700">
              <div className={`flex justify-center mb-3 ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className={`font-bold font-mono mb-2 ${feature.color}`}>
                {feature.title}
              </h3>
              <p className="text-metal-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="border-t border-dark-700 pt-8">
          <p className="text-radium-400 font-mono mb-2">
            &gt;&gt; ENSURING DATA INTEGRITY THROUGH DECENTRALIZED TECHNOLOGY
          </p>
          <p className="text-metal-400 text-sm font-mono">
            DOCUMENT NOTARIZATION • LEGAL CONTRACTS • ACADEMIC CERTIFICATES • HEALTHCARE DATA
          </p>
        </div>
      </div>
    </div>
  );
};