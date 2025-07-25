<<<<<<< HEAD
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
=======
import React from 'react';
import { Shield, Github, FileText, Users, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-3 rounded-xl">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                BlockSecure
              </h1>
              <p className="text-blue-200 text-sm">Blockchain File Integrity System</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <div className="flex items-center space-x-2 text-blue-200">
              <Users className="w-4 h-4" />
              <span className="text-sm">Enterprise Ready</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center space-x-3 mb-2">
              <Shield className="w-6 h-6 text-green-400" />
              <h3 className="font-semibold">Tamper-Proof</h3>
            </div>
            <p className="text-sm text-blue-100">Blockchain-verified file integrity with cryptographic hashing</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center space-x-3 mb-2">
              <FileText className="w-6 h-6 text-blue-400" />
              <h3 className="font-semibold">Smart Contracts</h3>
            </div>
            <p className="text-sm text-blue-100">Automated verification and immutable audit trails</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center space-x-3 mb-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h3 className="font-semibold">Real-time</h3>
            </div>
            <p className="text-sm text-blue-100">Instant verification with live blockchain monitoring</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center space-x-3 mb-2">
              <Users className="w-6 h-6 text-purple-400" />
              <h3 className="font-semibold">Enterprise</h3>
            </div>
            <p className="text-sm text-blue-100">Scalable solution for legal, healthcare, and finance</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg text-blue-100 mb-2">
            Ensuring data security and integrity through blockchain technology
          </p>
          <p className="text-sm text-blue-300">
            Perfect for document notarization, legal contracts, academic certificates, and healthcare data
          </p>
        </div>
      </div>
    </header>
>>>>>>> c2a80e6e7bcb104d97d520018a206e80bfa305b2
  );
};