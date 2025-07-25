<<<<<<< HEAD
// import React, { useState, useEffect } from 'react';
// import { History, FileText, Hash, Clock, User, Shield, ExternalLink, TrendingUp } from 'lucide-react';
// import { FileRecord, BlockchainTransaction } from '../types';
// import { BlockchainService } from '../services/blockchainService';

// export const AuditTrail: React.FC = () => {
//   const [fileRecords, setFileRecords] = useState<FileRecord[]>([]);
//   const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);
//   const [selectedRecord, setSelectedRecord] = useState<FileRecord | null>(null);

//   useEffect(() => {
//     const loadData = () => {
//       setFileRecords(BlockchainService.getFileRecords());
//       setTransactions(BlockchainService.getTransactions());
//     };

//     loadData();
//     const interval = setInterval(loadData, 2000); // Update every 2 seconds
//     return () => clearInterval(interval);
//   }, []);

//   const formatTimestamp = (timestamp: number) => {
//     return new Date(timestamp).toLocaleString();
//   };

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'confirmed': return 'text-green-600 bg-green-100';
//       case 'pending': return 'text-yellow-600 bg-yellow-100';
//       case 'failed': return 'text-red-600 bg-red-100';
//       default: return 'text-gray-600 bg-gray-100';
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg border border-gray-200">
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg mr-4">
//               <History className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900">Audit Trail</h2>
//               <p className="text-gray-600">Complete blockchain transaction history</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4 text-sm">
//             <div className="flex items-center">
//               <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
//               <span className="text-green-600 font-medium">{fileRecords.length} Files</span>
//             </div>
//             <div className="flex items-center">
//               <Shield className="w-4 h-4 text-blue-600 mr-1" />
//               <span className="text-blue-600 font-medium">{transactions.filter(t => t.status === 'confirmed').length} Confirmed</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 h-96">
//         {/* File Records */}
//         <div className="p-6 border-r border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <FileText className="w-5 h-5 mr-2" />
//             File Records ({fileRecords.length})
//           </h3>
//           <div className="space-y-3 max-h-80 overflow-y-auto">
//             {fileRecords.length === 0 ? (
//               <div className="text-center py-8 text-gray-500">
//                 <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                 <p>No files uploaded yet</p>
//               </div>
//             ) : (
//               fileRecords.map(record => (
//                 <div
//                   key={record.id}
//                   className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
//                     selectedRecord?.id === record.id
//                       ? 'border-blue-500 bg-blue-50'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                   onClick={() => setSelectedRecord(record)}
//                 >
//                   <div className="flex items-start justify-between mb-2">
//                     <h4 className="font-medium text-gray-900 truncate flex-1 mr-2">
//                       {record.filename}
//                     </h4>
//                     <div className="flex items-center space-x-2">
//                       {record.verified && (
//                         <Shield className="w-4 h-4 text-green-500" />
//                       )}
//                       {record.tampered && (
//                         <ExternalLink className="w-4 h-4 text-red-500" />
//                       )}
//                     </div>
//                   </div>
//                   <div className="text-xs text-gray-500 space-y-1">
//                     <div className="flex items-center">
//                       <Clock className="w-3 h-3 mr-1" />
//                       {formatTimestamp(record.uploadTimestamp)}
//                     </div>
//                     <div className="flex items-center">
//                       <Hash className="w-3 h-3 mr-1" />
//                       {record.hash.substring(0, 16)}...
//                     </div>
//                     <div className="flex items-center">
//                       <User className="w-3 h-3 mr-1" />
//                       {record.uploader.substring(0, 10)}...
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Transaction Details */}
//         <div className="p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <History className="w-5 h-5 mr-2" />
//             Transactions ({transactions.length})
//           </h3>
//           <div className="space-y-3 max-h-80 overflow-y-auto">
//             {transactions.length === 0 ? (
//               <div className="text-center py-8 text-gray-500">
//                 <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                 <p>No transactions yet</p>
//               </div>
//             ) : (
//               transactions.map(tx => (
//                 <div key={tx.id} className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
//                   <div className="flex items-start justify-between mb-2">
//                     <div className="flex-1">
//                       <h4 className="font-medium text-gray-900 mb-1">{tx.filename}</h4>
//                       <div className="flex items-center space-x-2">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
//                           {tx.status.toUpperCase()}
//                         </span>
//                         <span className="text-xs text-gray-500">Block #{tx.blockNumber}</span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="text-xs text-gray-500 space-y-1">
//                     <div className="flex items-center">
//                       <Hash className="w-3 h-3 mr-1" />
//                       TX: {tx.id.substring(0, 20)}...
//                     </div>
//                     <div className="flex items-center">
//                       <Clock className="w-3 h-3 mr-1" />
//                       {formatTimestamp(tx.timestamp)}
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span>Gas Used: {tx.gasUsed.toLocaleString()}</span>
//                       <span>Size: {formatFileSize(Math.random() * 1000000)}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>

//       {selectedRecord && (
//         <div className="p-6 border-t border-gray-200 bg-gray-50">
//           <h4 className="text-lg font-semibold text-gray-900 mb-3">Selected File Details</h4>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
//                 <p className="text-sm text-gray-900 bg-white p-2 rounded border">{selectedRecord.filename}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">File Hash (SHA-256)</label>
//                 <code className="block text-xs text-gray-900 bg-white p-2 rounded border break-all">
//                   {selectedRecord.hash}
//                 </code>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Block Hash</label>
//                 <code className="block text-xs text-gray-900 bg-white p-2 rounded border break-all">
//                   {selectedRecord.blockHash}
//                 </code>
//               </div>
//             </div>
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Upload Details</label>
//                 <div className="text-sm bg-white p-3 rounded border space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Size:</span>
//                     <span className="font-medium">{formatFileSize(selectedRecord.size)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Uploaded:</span>
//                     <span className="font-medium">{formatTimestamp(selectedRecord.uploadTimestamp)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Signatures:</span>
//                     <span className="font-medium">{selectedRecord.signatures.length}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Status:</span>
//                     <span className={`font-medium ${selectedRecord.verified ? 'text-green-600' : 'text-red-600'}`}>
//                       {selectedRecord.verified ? 'Verified' : 'Unverified'}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


=======
>>>>>>> c2a80e6e7bcb104d97d520018a206e80bfa305b2
import React, { useState, useEffect } from 'react';
import { History, FileText, Hash, Clock, User, Shield, ExternalLink, TrendingUp } from 'lucide-react';
import { FileRecord, BlockchainTransaction } from '../types';
import { BlockchainService } from '../services/blockchainService';

export const AuditTrail: React.FC = () => {
  const [fileRecords, setFileRecords] = useState<FileRecord[]>([]);
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<FileRecord | null>(null);

  useEffect(() => {
    const loadData = () => {
      setFileRecords(BlockchainService.getFileRecords());
      setTransactions(BlockchainService.getTransactions());
    };

    loadData();
    const interval = setInterval(loadData, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
<<<<<<< HEAD
      case 'confirmed': return 'text-radium-400 bg-radium-400/10';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'failed': return 'text-red-400 bg-red-400/10';
      default: return 'text-metal-400 bg-dark-700';
=======
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
>>>>>>> c2a80e6e7bcb104d97d520018a206e80bfa305b2
    }
  };

  return (
<<<<<<< HEAD
    <div className="relative bg-dark-800 rounded-xl border border-dark-700 glow-border">
      {/* Corner accents */}
      <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-neon-blue"></div>
      <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-neon-purple"></div>

      {/* Header */}
      <div className="p-6 border-b border-dark-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative inline-flex items-center justify-center w-12 h-12 bg-dark-700 rounded-lg mr-4 glow-border">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-neon-purple opacity-20 rounded-lg"></div>
              <History className="w-6 h-6 text-neon-blue" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-mono text-neon-blue tracking-wider">
                <span className="text-radium-400">{">>"}</span> AUDIT_TRAIL
              </h2>
              <p className="text-metal-400 font-mono text-sm tracking-wider">
                BLOCKCHAIN_TRANSACTION_HISTORY
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs font-mono">
            <div className="flex items-center text-radium-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{fileRecords.length} FILES</span>
            </div>
            <div className="flex items-center text-neon-blue">
              <Shield className="w-4 h-4 mr-1" />
              <span>{transactions.filter(t => t.status === 'confirmed').length} CONFIRMED</span>
=======
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg mr-4">
              <History className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Audit Trail</h2>
              <p className="text-gray-600">Complete blockchain transaction history</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">{fileRecords.length} Files</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-blue-600 font-medium">{transactions.filter(t => t.status === 'confirmed').length} Confirmed</span>
>>>>>>> c2a80e6e7bcb104d97d520018a206e80bfa305b2
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[30rem]">
        {/* File Records */}
        <div className="p-6 border-r border-dark-700">
          <h3 className="text-lg font-semibold font-mono text-neon-blue tracking-wider mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            FILE_RECORDS ({fileRecords.length})
          </h3>
          <div className="space-y-3 max-h-[24rem] overflow-y-auto">
            {fileRecords.length === 0 ? (
              <div className="text-center py-8 text-metal-500 font-mono">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>NO_FILES_FOUND</p>
=======
      <div className="grid grid-cols-1 lg:grid-cols-2 h-96">
        {/* File Records */}
        <div className="p-6 border-r border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            File Records ({fileRecords.length})
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {fileRecords.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No files uploaded yet</p>
>>>>>>> c2a80e6e7bcb104d97d520018a206e80bfa305b2
              </div>
            ) : (
              fileRecords.map(record => (
                <div
                  key={record.id}
<<<<<<< HEAD
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-glow-sm ${
                    selectedRecord?.id === record.id
                      ? 'border-neon-blue bg-dark-700/50'
                      : 'border-dark-600 hover:border-neon-blue/30'
=======
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedRecord?.id === record.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
>>>>>>> c2a80e6e7bcb104d97d520018a206e80bfa305b2
                  }`}
                  onClick={() => setSelectedRecord(record)}
                >
                  <div className="flex items-start justify-between mb-2">
<<<<<<< HEAD
                    <h4 className="font-medium font-mono text-white truncate flex-1 mr-2 tracking-wider">
=======
                    <h4 className="font-medium text-gray-900 truncate flex-1 mr-2">
>>>>>>> c2a80e6e7bcb104d97d520018a206e80bfa305b2
                      {record.filename}
                    </h4>
                    <div className="flex items-center space-x-2">
                      {record.verified && (
<<<<<<< HEAD
                        <Shield className="w-4 h-4 text-radium-400" />
                      )}
                      {record.tampered && (
                        <ExternalLink className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-metal-400 space-y-1 tracking-wider">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-neon-blue" />
                      {formatTimestamp(record.uploadTimestamp)}
                    </div>
                    <div className="flex items-center">
                      <Hash className="w-3 h-3 mr-1 text-neon-purple" />
                      {record.hash.substring(0, 16)}...
                    </div>
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1 text-metal-400" />
=======
                        <Shield className="w-4 h-4 text-green-500" />
                      )}
                      {record.tampered && (
                        <ExternalLink className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTimestamp(record.uploadTimestamp)}
                    </div>
                    <div className="flex items-center">
                      <Hash className="w-3 h-3 mr-1" />
                      {record.hash.substring(0, 16)}...
                    </div>
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
>>>>>>> c2a80e6e7bcb104d97d520018a206e80bfa305b2
                      {record.uploader.substring(0, 10)}...
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Transaction Details */}
        <div className="p-6">
<<<<<<< HEAD
          <h3 className="text-lg font-semibold font-mono text-neon-blue tracking-wider mb-4 flex items-center">
            <History className="w-5 h-5 mr-2" />
            TRANSACTIONS ({transactions.length})
          </h3>
          <div className="space-y-3 max-h-[24rem] overflow-y-auto">
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-metal-500 font-mono">
                <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>NO_TRANSACTIONS_FOUND</p>
              </div>
            ) : (
              transactions.map(tx => (
                <div 
                  key={tx.id} 
                  className="p-4 rounded-lg border border-dark-600 hover:border-neon-blue/30 transition-all hover:shadow-glow-sm"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium font-mono text-white mb-1 tracking-wider">
                        {tx.filename}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-mono ${getStatusColor(tx.status)}`}>
                          {tx.status.toUpperCase()}
                        </span>
                        <span className="text-xs font-mono text-metal-400">BLOCK #{tx.blockNumber}</span>
=======
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <History className="w-5 h-5 mr-2" />
            Transactions ({transactions.length})
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No transactions yet</p>
              </div>
            ) : (
              transactions.map(tx => (
                <div key={tx.id} className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{tx.filename}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                          {tx.status.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">Block #{tx.blockNumber}</span>
>>>>>>> c2a80e6e7bcb104d97d520018a206e80bfa305b2
                      </div>
                    </div>
                  </div>
                  
<<<<<<< HEAD
                  <div className="text-xs font-mono text-metal-400 space-y-1 tracking-wider">
                    <div className="flex items-center">
                      <Hash className="w-3 h-3 mr-1 text-neon-purple" />
                      TX: {tx.id.substring(0, 20)}...
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-neon-blue" />
                      {formatTimestamp(tx.timestamp)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>GAS: {tx.gasUsed.toLocaleString()}</span>
                      <span>SIZE: {formatFileSize(Math.random() * 1000000)}</span>
=======
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center">
                      <Hash className="w-3 h-3 mr-1" />
                      TX: {tx.id.substring(0, 20)}...
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTimestamp(tx.timestamp)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Gas Used: {tx.gasUsed.toLocaleString()}</span>
                      <span>Size: {formatFileSize(Math.random() * 1000000)}</span>
>>>>>>> c2a80e6e7bcb104d97d520018a206e80bfa305b2
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Selected File Details */}
      {selectedRecord && (
        <div className="p-6 border-t border-dark-700 bg-dark-900">
          <h4 className="text-lg font-semibold font-mono text-neon-blue tracking-wider mb-3">
            SELECTED_FILE_DETAILS
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-metal-400 tracking-wider mb-1">
                  FILE_NAME
                </label>
                <p className="text-sm font-mono text-white bg-dark-700 p-2 rounded border border-dark-600">
                  {selectedRecord.filename}
                </p>
              </div>
              <div>
                <label className="block text-xs font-mono text-metal-400 tracking-wider mb-1">
                  FILE_HASH (SHA-256)
                </label>
                <code className="block text-xs font-mono text-metal-400 bg-dark-700 p-2 rounded border border-dark-600 break-all">
=======
      {selectedRecord && (
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Selected File Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
                <p className="text-sm text-gray-900 bg-white p-2 rounded border">{selectedRecord.filename}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File Hash (SHA-256)</label>
                <code className="block text-xs text-gray-900 bg-white p-2 rounded border break-all">
>>>>>>> c2a80e6e7bcb104d97d520018a206e80bfa305b2
                  {selectedRecord.hash}
                </code>
              </div>
              <div>
<<<<<<< HEAD
                <label className="block text-xs font-mono text-metal-400 tracking-wider mb-1">
                  BLOCK_HASH
                </label>
                <code className="block text-xs font-mono text-metal-400 bg-dark-700 p-2 rounded border border-dark-600 break-all">
=======
                <label className="block text-sm font-medium text-gray-700 mb-1">Block Hash</label>
                <code className="block text-xs text-gray-900 bg-white p-2 rounded border break-all">
>>>>>>> c2a80e6e7bcb104d97d520018a206e80bfa305b2
                  {selectedRecord.blockHash}
                </code>
              </div>
            </div>
            <div className="space-y-3">
              <div>
<<<<<<< HEAD
                <label className="block text-xs font-mono text-metal-400 tracking-wider mb-1">
                  UPLOAD_DETAILS
                </label>
                <div className="text-sm font-mono bg-dark-700 p-3 rounded border border-dark-600 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-metal-400">SIZE:</span>
                    <span className="text-white">{formatFileSize(selectedRecord.size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-metal-400">UPLOADED:</span>
                    <span className="text-white">{formatTimestamp(selectedRecord.uploadTimestamp)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-metal-400">SIGNATURES:</span>
                    <span className="text-white">{selectedRecord.signatures.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-metal-400">STATUS:</span>
                    <span className={selectedRecord.verified ? 'text-radium-400' : 'text-red-400'}>
                      {selectedRecord.verified ? 'VERIFIED' : 'UNVERIFIED'}
=======
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Details</label>
                <div className="text-sm bg-white p-3 rounded border space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">{formatFileSize(selectedRecord.size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uploaded:</span>
                    <span className="font-medium">{formatTimestamp(selectedRecord.uploadTimestamp)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Signatures:</span>
                    <span className="font-medium">{selectedRecord.signatures.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${selectedRecord.verified ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedRecord.verified ? 'Verified' : 'Unverified'}
>>>>>>> c2a80e6e7bcb104d97d520018a206e80bfa305b2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
<<<<<<< HEAD

      {/* Bottom corner accents */}
      <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-neon-purple"></div>
      <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-neon-blue"></div>
=======
>>>>>>> c2a80e6e7bcb104d97d520018a206e80bfa305b2
    </div>
  );
};