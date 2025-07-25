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
  );
};