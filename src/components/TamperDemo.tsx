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
    'Upload original file',
    'Generate tampered version',
    'Verify both files',
    'Compare results'
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
      // Read original file content
      const originalContent = await originalFile.text();
      
      // Generate tampered content
      const tamperedContent = CryptoUtils.simulateFileTampering(originalContent);
      
      // Create tampered file
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
      // First upload original file to get blockchain record
      const originalRecord = await BlockchainService.uploadToBlockchain(originalFile);
      
      // Wait a moment for blockchain confirmation
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Verify original file
      const originalResult = await BlockchainService.verifyFileIntegrity(originalFile, originalRecord);
      
      // Verify tampered file against original record
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
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full mb-4">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tamper Detection Demo</h2>
        <p className="text-gray-600">See how blockchain verification detects file tampering</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                index <= demoStep
                  ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <span className={`text-xs mt-2 text-center ${
                index <= demoStep ? 'text-gray-900 font-medium' : 'text-gray-500'
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded"></div>
          <div 
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-red-500 to-orange-600 rounded transition-all duration-500"
            style={{ width: `${(demoStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="space-y-6">
        {demoStep === 0 && (
          <div className="text-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-all">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">Upload a file to start the demo</p>
              <p className="text-sm text-gray-500 mb-4">We'll create a tampered version and show verification</p>
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="demo-file-upload"
                accept=".txt,.json,.js,.html,.css,.md"
              />
              <label
                htmlFor="demo-file-upload"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-orange-700 transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </label>
            </div>
          </div>
        )}

        {demoStep === 1 && originalFile && (
          <div className="text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">Original File Loaded</h3>
              <p className="text-green-700 mb-4">
                File: <span className="font-mono">{originalFile.name}</span> ({(originalFile.size / 1024).toFixed(2)} KB)
              </p>
              <button
                onClick={generateTamperedFile}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-orange-700 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <FileX className="w-4 h-4 mr-2" />
                )}
                {loading ? 'Generating...' : 'Generate Tampered Version'}
              </button>
            </div>
          </div>
        )}

        {demoStep === 2 && originalFile && tamperedFile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">Original File</h3>
              <p className="text-sm text-green-700 mb-2">Name: {originalFile.name}</p>
              <p className="text-sm text-green-700">Size: {(originalFile.size / 1024).toFixed(2)} KB</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">Tampered File</h3>
              <p className="text-sm text-red-700 mb-2">Name: {tamperedFile.name}</p>
              <p className="text-sm text-red-700">Size: {(tamperedFile.size / 1024).toFixed(2)} KB</p>
            </div>
            <div className="md:col-span-2 text-center">
              <button
                onClick={verifyFiles}
                disabled={loading}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <AlertTriangle className="w-5 h-5 mr-2" />
                )}
                {loading ? 'Verifying Files...' : 'Verify Both Files'}
              </button>
            </div>
          </div>
        )}

        {demoStep === 3 && verificationResults.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 text-center">Verification Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {verificationResults.map((item, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-6 border-2 ${
                    item.result.isValid
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center mb-4">
                    {item.result.isValid ? (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">✗</span>
                      </div>
                    )}
                    <div>
                      <h4 className={`font-bold ${
                        item.result.isValid ? 'text-green-900' : 'text-red-900'
                      }`}>
                        {item.type === 'original' ? 'Original File' : 'Tampered File'}
                      </h4>
                      <p className={`text-sm ${
                        item.result.isValid ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {item.result.isValid ? 'Verification Passed' : 'Verification Failed'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-xs space-y-2">
                    <div>
                      <span className="font-medium block mb-1">Current Hash:</span>
                      <code className="block bg-white p-2 rounded break-all">
                        {item.result.currentHash}
                      </code>
                    </div>
                    <div>
                      <span className="font-medium block mb-1">Expected Hash:</span>
                      <code className="block bg-white p-2 rounded break-all">
                        {item.result.originalHash}
                      </code>
                    </div>
                  </div>

                  {item.result.tamperDetails && (
                    <div className="mt-4 pt-4 border-t border-red-200">
                      <h5 className="font-medium text-red-900 mb-2">Issues Detected:</h5>
                      <ul className="text-xs text-red-700 space-y-1">
                        {item.result.tamperDetails.map((detail: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="inline-block w-1 h-1 bg-red-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={resetDemo}
                className="inline-flex items-center px-4 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-all"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};