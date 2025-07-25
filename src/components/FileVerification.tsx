// import React, { useState, useCallback } from 'react';
// import { Shield, Search, CheckCircle, XCircle, AlertTriangle, Hash, Clock, User } from 'lucide-react';
// import { VerificationResult } from '../types';
// import { BlockchainService } from '../services/blockchainService';

// export const FileVerification: React.FC = () => {
//   const [verifying, setVerifying] = useState(false);
//   const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
//   const [dragActive, setDragActive] = useState(false);

//   const handleDrag = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   }, []);

//   const handleDrop = useCallback(async (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     const files = Array.from(e.dataTransfer.files);
//     if (files.length > 0) {
//       await handleFileVerification(files[0]);
//     }
//   }, []);

//   const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       await handleFileVerification(files[0]);
//     }
//   }, []);

//   const handleFileVerification = async (file: File) => {
//     setVerifying(true);
//     setVerificationResult(null);

//     try {
//       // Simulate verification process
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       const result = await BlockchainService.verifyFileIntegrity(file);
//       setVerificationResult(result);
//     } catch (error) {
//       console.error('Verification failed:', error);
//     } finally {
//       setVerifying(false);
//     }
//   };

//   const formatTimestamp = (timestamp: number) => {
//     return new Date(timestamp).toLocaleString();
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
//       <div className="text-center mb-6">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mb-4">
//           <Shield className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">File Verification</h2>
//         <p className="text-gray-600">Verify file integrity against blockchain records</p>
//       </div>

//       <div
//         className={`relative border-2 border-dashed rounded-lg p-8 transition-all ${
//           dragActive 
//             ? 'border-green-500 bg-green-50' 
//             : 'border-gray-300 hover:border-gray-400'
//         } ${verifying ? 'pointer-events-none opacity-75' : ''}`}
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//       >
//         {verifying ? (
//           <div className="text-center">
//             <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 animate-spin">
//               <Search className="w-6 h-6 text-green-600" />
//             </div>
//             <p className="text-lg font-medium text-gray-900 mb-2">Verifying File</p>
//             <p className="text-sm text-gray-600">Checking blockchain records...</p>
//           </div>
//         ) : (
//           <div className="text-center">
//             <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//             <div className="mb-4">
//               <p className="text-lg font-medium text-gray-900">
//                 Drop file to verify integrity
//               </p>
//               <p className="text-sm text-gray-500 mt-1">
//                 Compare against blockchain records
//               </p>
//             </div>
//             <input
//               type="file"
//               className="hidden"
//               onChange={handleFileSelect}
//               id="verify-upload"
//               accept="*/*"
//             />
//             <label
//               htmlFor="verify-upload"
//               className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-teal-700 transition-all cursor-pointer"
//             >
//               <Search className="w-4 h-4 mr-2" />
//               Select File to Verify
//             </label>
//           </div>
//         )}
//       </div>

//       {verificationResult && (
//         <div className="mt-6">
//           <div className={`rounded-lg p-6 border-2 ${
//             verificationResult.isValid 
//               ? 'bg-green-50 border-green-200' 
//               : 'bg-red-50 border-red-200'
//           }`}>
//             <div className="flex items-center mb-4">
//               {verificationResult.isValid ? (
//                 <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
//               ) : (
//                 <XCircle className="w-8 h-8 text-red-600 mr-3" />
//               )}
//               <div>
//                 <h3 className={`text-lg font-bold ${
//                   verificationResult.isValid ? 'text-green-900' : 'text-red-900'
//                 }`}>
//                   {verificationResult.isValid ? 'File Verified' : 'Verification Failed'}
//                 </h3>
//                 <p className={`text-sm ${
//                   verificationResult.isValid ? 'text-green-700' : 'text-red-700'
//                 }`}>
//                   {verificationResult.isValid 
//                     ? 'File integrity confirmed by blockchain' 
//                     : 'File has been tampered with or not found'
//                   }
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//               <div className="space-y-3">
//                 <div className="flex items-center">
//                   <Hash className="w-4 h-4 mr-2 text-gray-500" />
//                   <span className="font-medium">Current Hash:</span>
//                 </div>
//                 <code className="block bg-gray-100 p-2 rounded text-xs break-all">
//                   {verificationResult.currentHash}
//                 </code>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex items-center">
//                   <Hash className="w-4 h-4 mr-2 text-gray-500" />
//                   <span className="font-medium">Original Hash:</span>
//                 </div>
//                 <code className="block bg-gray-100 p-2 rounded text-xs break-all">
//                   {verificationResult.originalHash || 'Not found'}
//                 </code>
//               </div>
//             </div>

//             {verificationResult.blockchainRecord && (
//               <div className="mt-4 pt-4 border-t border-gray-200">
//                 <h4 className="font-medium text-gray-900 mb-2">Blockchain Record:</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
//                   <div className="flex items-center">
//                     <Clock className="w-3 h-3 mr-1 text-gray-500" />
//                     <span>Uploaded: {formatTimestamp(verificationResult.blockchainRecord.uploadTimestamp)}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <User className="w-3 h-3 mr-1 text-gray-500" />
//                     <span>By: {verificationResult.blockchainRecord.uploader.substring(0, 10)}...</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Shield className="w-3 h-3 mr-1 text-gray-500" />
//                     <span>Signatures: {verificationResult.blockchainRecord.signatures.length}</span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {verificationResult.tamperDetails && (
//               <div className="mt-4 pt-4 border-t border-red-200">
//                 <div className="flex items-start">
//                   <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
//                   <div>
//                     <h4 className="font-medium text-red-900 mb-2">Tampering Detected:</h4>
//                     <ul className="text-sm text-red-700 space-y-1">
//                       {verificationResult.tamperDetails.map((detail, index) => (
//                         <li key={index} className="flex items-start">
//                           <span className="inline-block w-1 h-1 bg-red-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
//                           {detail}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };



import React, { useState, useCallback } from 'react';
import { Shield, Search, CheckCircle, XCircle, AlertTriangle, Hash, Clock, User } from 'lucide-react';
import { VerificationResult } from '../types';
import { BlockchainService } from '../services/blockchainService';

export const FileVerification: React.FC = () => {
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await handleFileVerification(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFileVerification(files[0]);
    }
  }, []);

  const handleFileVerification = async (file: File) => {
    setVerifying(true);
    setVerificationResult(null);

    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = await BlockchainService.verifyFileIntegrity(file);
      setVerificationResult(result);
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setVerifying(false);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="relative bg-dark-800 rounded-xl border border-dark-700 p-8 glow-border">
      {/* Corner accents */}
      <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-neon-blue"></div>
      <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-neon-purple"></div>
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="relative inline-flex items-center justify-center w-16 h-16 bg-dark-700 rounded-full mb-4 glow-border">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-neon-purple opacity-20 rounded-full"></div>
          <Shield className="w-8 h-8 text-neon-blue" />
        </div>
        <h2 className="text-2xl font-bold font-mono text-neon-blue tracking-wider">
          <span className="text-radium-400">{">>"}</span> FILE_VERIFICATION
        </h2>
        <p className="text-metal-400 font-mono text-sm tracking-wider">
          BLOCKCHAIN-INTEGRITY_CHECK
        </p>
      </div>

      {/* Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all ${
          dragActive 
            ? 'border-neon-blue bg-dark-700/50 shadow-glow' 
            : 'border-dark-600 hover:border-neon-blue/50'
        } ${verifying ? 'pointer-events-none opacity-90' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {verifying ? (
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-12 h-12 bg-dark-700 rounded-full mb-4">
              <div className="absolute inset-0 bg-neon-blue/10 rounded-full animate-pulse"></div>
              <Search className="w-6 h-6 text-neon-blue animate-spin" />
            </div>
            <p className="text-lg font-mono text-neon-blue mb-2 tracking-wider">
              VERIFYING_FILE
            </p>
            <p className="text-xs font-mono text-metal-400 tracking-wider">
              SCANNING_BLOCKCHAIN_RECORDS...
            </p>
          </div>
        ) : (
          <div className="text-center">
            <Search className="mx-auto h-12 w-12 text-metal-600 mb-4" />
            <div className="mb-6">
              <p className="text-lg font-mono text-neon-blue mb-1 tracking-wider">
                DROP_FILE_TO_VERIFY
              </p>
              <p className="text-xs font-mono text-metal-500 tracking-wider">
                COMPARE_AGAINST_BLOCKCHAIN
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              id="verify-upload"
              accept="*/*"
            />
            <label
              htmlFor="verify-upload"
              className="relative inline-flex items-center px-6 py-3 bg-dark-700 text-neon-blue font-mono text-sm tracking-wider rounded-lg border border-neon-blue/30 hover:bg-neon-blue/10 hover:shadow-glow-sm transition-all cursor-pointer group"
            >
              <span className="relative z-10 flex items-center">
                <Search className="w-4 h-4 mr-2 text-radium-400" />
                INITIATE_VERIFICATION
              </span>
              <span className="absolute inset-0 border border-neon-blue rounded-lg translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></span>
            </label>
          </div>
        )}
      </div>

      {/* Verification Result */}
      {verificationResult && (
        <div className="mt-8">
          <div className={`rounded-lg p-6 border-2 ${
            verificationResult.isValid 
              ? 'bg-dark-700/50 border-radium-400/30' 
              : 'bg-dark-700/50 border-red-400/30'
          } glow-border`}>
            <div className="flex items-start mb-4">
              {verificationResult.isValid ? (
                <div className="bg-radium-400/10 p-2 rounded-md mr-3">
                  <CheckCircle className="w-6 h-6 text-radium-400" />
                </div>
              ) : (
                <div className="bg-red-400/10 p-2 rounded-md mr-3">
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
              )}
              <div>
                <h3 className={`text-lg font-bold font-mono tracking-wider ${
                  verificationResult.isValid ? 'text-radium-400' : 'text-red-400'
                }`}>
                  {verificationResult.isValid ? 'VERIFICATION_SUCCESS' : 'SECURITY_BREACH'}
                </h3>
                <p className={`text-sm font-mono tracking-wider ${
                  verificationResult.isValid ? 'text-metal-400' : 'text-red-400'
                }`}>
                  {verificationResult.isValid 
                    ? 'FILE_INTEGRITY_CONFIRMED' 
                    : 'TAMPER_DETECTED_OR_FILE_NOT_FOUND'
                  }
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center text-metal-400 font-mono text-xs tracking-wider">
                  <Hash className="w-3 h-3 mr-2 text-neon-blue" />
                  <span>CURRENT_HASH:</span>
                </div>
                <code className="block bg-dark-900 p-3 rounded text-xs font-mono break-all text-metal-400 border border-dark-600">
                  {verificationResult.currentHash}
                </code>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-metal-400 font-mono text-xs tracking-wider">
                  <Hash className="w-3 h-3 mr-2 text-neon-purple" />
                  <span>ORIGINAL_HASH:</span>
                </div>
                <code className="block bg-dark-900 p-3 rounded text-xs font-mono break-all text-metal-400 border border-dark-600">
                  {verificationResult.originalHash || 'NOT_FOUND'}
                </code>
              </div>
            </div>

            {verificationResult.blockchainRecord && (
              <div className="mt-6 pt-5 border-t border-dark-600">
                <h4 className="font-medium font-mono text-neon-blue tracking-wider mb-3">BLOCKCHAIN_RECORD:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="flex items-center text-metal-400">
                    <Clock className="w-3 h-3 mr-2 text-neon-blue" />
                    <span>UPLOADED: {formatTimestamp(verificationResult.blockchainRecord.uploadTimestamp)}</span>
                  </div>
                  <div className="flex items-center text-metal-400">
                    <User className="w-3 h-3 mr-2 text-neon-purple" />
                    <span>BY: {verificationResult.blockchainRecord.uploader.substring(0, 10)}...</span>
                  </div>
                  <div className="flex items-center text-metal-400">
                    <Shield className="w-3 h-3 mr-2 text-radium-400" />
                    <span>SIGNATURES: {verificationResult.blockchainRecord.signatures.length}</span>
                  </div>
                </div>
              </div>
            )}

            {verificationResult.tamperDetails && (
              <div className="mt-6 pt-5 border-t border-red-400/30">
                <div className="flex items-start">
                  <div className="bg-red-400/10 p-1.5 rounded-md mr-3">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-medium font-mono text-red-400 tracking-wider mb-2">TAMPER_EVIDENCE:</h4>
                    <ul className="text-sm font-mono text-red-400 space-y-1">
                      {verificationResult.tamperDetails.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom corner accents */}
      <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-neon-purple"></div>
      <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-neon-blue"></div>
    </div>
  );
};