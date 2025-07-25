import React, { useState } from 'react';
import { AlertTriangle, FileX, RefreshCw, Download, Upload } from 'lucide-react';
import { CryptoUtils } from '../utils/crypto';
import { BlockchainService } from '../services/blockchainService';

export const TamperDemo: React.FC = () => {
  const [demoStep, setDemoStep] = useState(0);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [tamperedFile, setTamperedFile] = useState<File | null>(null);
  const [verificationResults, setVerificationResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const steps = [
    'UPLOAD_ORIGINAL',
    'GENERATE_TAMPERED',
    'VERIFY_FILES',
    'COMPARE_RESULTS'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      setDemoStep(1);
    }
  };

  const generateTamperedFile = async () => {
    if (!originalFile) return;

    setLoading(true);
    try {
      const originalContent = await originalFile.text();
      const tamperedContent = CryptoUtils.simulateFileTampering(originalContent);
      const tamperedBlob = new Blob([tamperedContent], { type: originalFile.type });
      const tamperedFile = new File([tamperedBlob], `${originalFile.name}_TAMPERED`, {
        type: originalFile.type,
        lastModified: Date.now()
      });
      
      setTamperedFile(tamperedFile);
      setDemoStep(2);
    } catch (error) {
      console.error('Error generating tampered file:', error);
    } finally {
      setLoading(false);
    }
  };

  const verifyFiles = async () => {
    if (!originalFile || !tamperedFile) return;

    setLoading(true);
    try {
      const originalRecord = await BlockchainService.uploadToBlockchain(originalFile);
      await new Promise(resolve => setTimeout(resolve, 3000));
      const originalResult = await BlockchainService.verifyFileIntegrity(originalFile, originalRecord);
      const tamperedResult = await BlockchainService.verifyFileIntegrity(tamperedFile, originalRecord);

      setVerificationResults([
        { file: originalFile, result: originalResult, type: 'original' },
        { file: tamperedFile, result: tamperedResult, type: 'tampered' }
      ]);
      
      setDemoStep(3);
    } catch (error) {
      console.error('Error verifying files:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetDemo = () => {
    setDemoStep(0);
    setOriginalFile(null);
    setTamperedFile(null);
    setVerificationResults([]);
    setLoading(false);
  };

  return (
    <div className="relative bg-dark-800 rounded-xl border border-dark-700 p-6 glow-border">
      {/* Corner accents */}
      <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-neon-blue"></div>
      <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-neon-purple"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative inline-flex items-center justify-center w-10 h-10 bg-dark-700 rounded-lg glow-border">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-neon-purple opacity-20 rounded-lg"></div>
            <AlertTriangle className="w-5 h-5 text-neon-blue" />
          </div>
          <h2 className="text-xl font-bold font-mono text-neon-blue tracking-wider">
            <span className="text-radium-400">{">>"}</span> TAMPER_DEMO
          </h2>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-radium-400">
          <div className="w-2 h-2 bg-radium-400 rounded-full animate-pulse"></div>
          <span>LIVE_DEMO</span>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono font-bold ${
                index <= demoStep
                  ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-dark-800'
                  : 'bg-dark-700 text-metal-400'
              }`}>
                {index + 1}
              </div>
              <span className={`text-xs font-mono mt-2 text-center ${
                index <= demoStep ? 'text-neon-blue font-bold' : 'text-metal-400'
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-dark-700 w-full rounded"></div>
          <div 
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded transition-all duration-500"
            style={{ width: `${(demoStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="space-y-6">
        {demoStep === 0 && (
          <div className="text-center">
            <div className="border-2 border-dashed border-dark-600 rounded-lg p-8 hover:border-neon-blue/50 transition-all hover:shadow-glow-sm">
              <Upload className="mx-auto h-12 w-12 text-metal-400 mb-4" />
              <p className="text-lg font-mono text-neon-blue mb-2">UPLOAD_FILE_TO_BEGIN</p>
              <p className="text-xs font-mono text-metal-400 mb-4">
                WE_WILL_CREATE_TAMPERED_VERSION
              </p>
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="demo-file-upload"
                accept=".txt,.json,.js,.html,.css,.md"
              />
              <label
                htmlFor="demo-file-upload"
                className="relative inline-flex items-center px-6 py-3 bg-dark-700 text-metal-200 font-mono text-sm rounded-lg border border-neon-blue/30 hover:bg-neon-blue/10 hover:shadow-glow-sm transition-all cursor-pointer group"
              >
                <span className="relative z-10 flex items-center">
                  <Upload className="w-4 h-4 mr-2 text-neon-blue" />
                  SELECT_FILE
                </span>
                <span className="absolute inset-0 border border-neon-blue rounded-lg translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></span>
              </label>
            </div>
          </div>
        )}

        {demoStep === 1 && originalFile && (
          <div className="bg-dark-700/50 p-6 rounded-lg border border-neon-blue/30 glow-border">
            <h3 className="text-lg font-mono text-neon-blue mb-4">ORIGINAL_FILE_LOADED</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs font-mono text-metal-400 mb-1">FILENAME</p>
                <p className="font-mono text-metal-200">{originalFile.name}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-metal-400 mb-1">SIZE</p>
                <p className="font-mono text-metal-200">{(originalFile.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <button
              onClick={generateTamperedFile}
              disabled={loading}
              className="w-full py-3 bg-dark-700 text-neon-blue font-mono text-sm rounded-lg border border-neon-blue/30 hover:bg-neon-blue/10 hover:shadow-glow-sm transition-all disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 mx-auto animate-spin" />
              ) : (
                <span className="flex items-center justify-center">
                  <FileX className="w-4 h-4 mr-2" />
                  GENERATE_TAMPERED_VERSION
                </span>
              )}
            </button>
          </div>
        )}

        {demoStep === 2 && originalFile && tamperedFile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark-700/50 p-6 rounded-lg border border-neon-blue/30 glow-border">
              <h3 className="text-lg font-mono text-neon-blue mb-4">ORIGINAL_FILE</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-mono text-metal-400">FILENAME</p>
                  <p className="font-mono text-metal-200">{originalFile.name}</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-metal-400">SIZE</p>
                  <p className="font-mono text-metal-200">{(originalFile.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
            </div>
            
            <div className="bg-dark-700/50 p-6 rounded-lg border border-radium-400/30 glow-border">
              <h3 className="text-lg font-mono text-radium-400 mb-4">TAMPERED_FILE</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-mono text-metal-400">FILENAME</p>
                  <p className="font-mono text-metal-200">{tamperedFile.name}</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-metal-400">SIZE</p>
                  <p className="font-mono text-metal-200">{(tamperedFile.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <button
                onClick={verifyFiles}
                disabled={loading}
                className="w-full py-3 bg-dark-700 text-neon-purple font-mono text-sm rounded-lg border border-neon-purple/30 hover:bg-neon-purple/10 hover:shadow-glow-sm transition-all disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 mx-auto animate-spin" />
                ) : (
                  <span className="flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    VERIFY_FILE_INTEGRITY
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {demoStep === 3 && verificationResults.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-mono font-bold text-neon-blue text-center">
              VERIFICATION_RESULTS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {verificationResults.map((item, index) => (
                <div
                  key={index}
                  className={`bg-dark-700/50 p-6 rounded-lg border ${
                    item.result.isValid ? 'border-neon-blue/30' : 'border-radium-400/30'
                  } glow-border`}
                >
                  <h4 className={`text-lg font-mono font-bold mb-4 ${
                    item.result.isValid ? 'text-neon-blue' : 'text-radium-400'
                  }`}>
                    {item.type === 'original' ? 'ORIGINAL_FILE' : 'TAMPERED_FILE'}
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-xs font-mono text-metal-400 mb-1">STATUS</p>
                      <p className={`font-mono ${
                        item.result.isValid ? 'text-neon-blue' : 'text-radium-400'
                      }`}>
                        {item.result.isValid ? 'VALID' : 'INVALID'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-metal-400 mb-1">FILENAME</p>
                      <p className="font-mono text-metal-200">{item.file.name}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-mono text-metal-400 mb-2">FILE_HASH</p>
                      <code className="block p-2 bg-dark-800 rounded border border-dark-600 text-xs font-mono text-metal-200 break-all">
                        {item.result.currentHash}
                      </code>
                    </div>
                    
                    <div>
                      <p className="text-xs font-mono text-metal-400 mb-2">BLOCKCHAIN_HASH</p>
                      <code className="block p-2 bg-dark-800 rounded border border-dark-600 text-xs font-mono text-metal-200 break-all">
                        {item.result.originalHash || 'N/A'}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={resetDemo}
              className="w-full py-3 bg-dark-700 text-metal-200 font-mono text-sm rounded-lg border border-dark-600 hover:bg-dark-600 hover:shadow-glow-sm transition-all"
            >
              <span className="flex items-center justify-center">
                <RefreshCw className="w-4 h-4 mr-2" />
                RESET_DEMO
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom corner accents */}
      <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-neon-purple"></div>
      <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-neon-blue"></div>
    </div>
  );
};