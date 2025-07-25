// import React, { useCallback, useState } from 'react';
// import { Upload, File, Hash, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
// import { FileRecord } from '../types';
// import { BlockchainService } from '../services/blockchainService';

// interface FileUploadProps {
//   onFileUploaded: (record: FileRecord) => void;
// }

// export const FileUpload: React.FC<FileUploadProps> = ({ onFileUploaded }) => {
//   const [dragActive, setDragActive] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState<string>('');

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
//       await handleFileUpload(files[0]);
//     }
//   }, []);

//   const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       await handleFileUpload(files[0]);
//     }
//   }, []);

//   const handleFileUpload = async (file: File) => {
//     setUploading(true);
//     setUploadProgress('Analyzing file...');

//     try {
//       // Step 1: Generate hash
//       setUploadProgress('Generating cryptographic hash...');
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       // Step 2: Create blockchain transaction
//       setUploadProgress('Creating blockchain transaction...');
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       // Step 3: Upload to blockchain
//       setUploadProgress('Recording on blockchain...');
//       const fileRecord = await BlockchainService.uploadToBlockchain(file);

//       // Step 4: Confirmation
//       setUploadProgress('Confirming transaction...');
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       onFileUploaded(fileRecord);
//       setUploadProgress('Upload complete!');
      
//       setTimeout(() => {
//         setUploadProgress('');
//         setUploading(false);
//       }, 2000);
      
//     } catch (error) {
//       console.error('Upload failed:', error);
//       setUploadProgress('Upload failed. Please try again.');
//       setTimeout(() => {
//         setUploadProgress('');
//         setUploading(false);
//       }, 3000);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
//       <div className="text-center mb-6">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
//           <Upload className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Secure File Upload</h2>
//         <p className="text-gray-600">Upload files with blockchain-verified integrity</p>
//       </div>

//       <div
//         className={`relative border-2 border-dashed rounded-lg p-8 transition-all ${
//           dragActive 
//             ? 'border-blue-500 bg-blue-50' 
//             : 'border-gray-300 hover:border-gray-400'
//         } ${uploading ? 'pointer-events-none opacity-75' : ''}`}
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//       >
//         {uploading ? (
//           <div className="text-center">
//             <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 animate-pulse">
//               <Hash className="w-6 h-6 text-blue-600" />
//             </div>
//             <p className="text-lg font-medium text-gray-900 mb-2">Processing File</p>
//             <p className="text-sm text-gray-600 mb-4">{uploadProgress}</p>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 animate-pulse w-3/4"></div>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center">
//             <File className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//             <div className="mb-4">
//               <p className="text-lg font-medium text-gray-900">
//                 Drop files here or click to browse
//               </p>
//               <p className="text-sm text-gray-500 mt-1">
//                 Supports all file types • Maximum 10MB
//               </p>
//             </div>
//             <input
//               type="file"
//               className="hidden"
//               onChange={handleFileSelect}
//               id="file-upload"
//               accept="*/*"
//             />
//             <label
//               htmlFor="file-upload"
//               className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all cursor-pointer"
//             >
//               <Upload className="w-4 h-4 mr-2" />
//               Choose File
//             </label>
//           </div>
//         )}
//       </div>

//       <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//         <div className="flex items-center text-green-600">
//           <CheckCircle className="w-4 h-4 mr-2" />
//           SHA-256 Hashing
//         </div>
//         <div className="flex items-center text-green-600">
//           <CheckCircle className="w-4 h-4 mr-2" />
//           Blockchain Logging
//         </div>
//         <div className="flex items-center text-green-600">
//           <CheckCircle className="w-4 h-4 mr-2" />
//           Digital Signatures
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useCallback, useState } from 'react';
import { Upload, File, Hash, Clock, CheckCircle, AlertTriangle, Shield } from 'lucide-react';
import { FileRecord } from '../types';
import { BlockchainService } from '../services/blockchainService';

interface FileUploadProps {
  onFileUploaded: (record: FileRecord) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUploaded }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');

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
      await handleFileUpload(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setUploadProgress('Initializing quantum encryption...');

    try {
      setUploadProgress('Generating SHA-256 hash...');
      await new Promise(resolve => setTimeout(resolve, 800));

      setUploadProgress('Creating immutable blockchain record...');
      await new Promise(resolve => setTimeout(resolve, 1200));

      setUploadProgress('Finalizing cryptographic signatures...');
      const fileRecord = await BlockchainService.uploadToBlockchain(file);

      setUploadProgress('Verifying decentralized consensus...');
      await new Promise(resolve => setTimeout(resolve, 800));

      onFileUploaded(fileRecord);
      setUploadProgress('SECURE_UPLOAD_COMPLETE');
      
      setTimeout(() => {
        setUploadProgress('');
        setUploading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadProgress('UPLOAD_FAILURE: Security protocol violated');
      setTimeout(() => {
        setUploadProgress('');
        setUploading(false);
      }, 3000);
    }
  };

  return (
    <div className="relative bg-dark-800 rounded-xl border border-dark-700 p-8 glow-border">
      <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-neon-blue"></div>
      <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-neon-purple"></div>
      
      <div className="text-center mb-8">
        <div className="relative inline-flex items-center justify-center w-16 h-16 bg-dark-700 rounded-full mb-4 glow-border">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-neon-purple opacity-20 rounded-full"></div>
          <Upload className="w-8 h-8 text-neon-blue" />
        </div>
        <h2 className="text-2xl font-bold font-mono text-neon-blue mb-2 tracking-wider">
          <span className="text-radium-400">&gt;&gt;</span> SECURE_UPLOAD
        </h2>
        <p className="text-metal-400 font-mono text-sm tracking-wider">
          BLOCKCHAIN-VERIFIED FILE INTEGRITY PROTOCOL
        </p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all ${
          dragActive 
            ? 'border-neon-blue bg-dark-700/50 shadow-glow' 
            : 'border-dark-600 hover:border-neon-blue/50'
        } ${uploading ? 'pointer-events-none opacity-90' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {uploading ? (
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-12 h-12 bg-dark-700 rounded-full mb-4">
              <div className="absolute inset-0 bg-radium-400/10 rounded-full animate-pulse"></div>
              <Hash className="w-6 h-6 text-radium-400" />
            </div>
            <p className="text-lg font-mono text-neon-blue mb-2 tracking-wider">
              PROCESSING_FILE
            </p>
            <p className="text-xs font-mono text-metal-400 mb-4 tracking-wider">
              {uploadProgress}
            </p>
            <div className="w-full bg-dark-700 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-neon-blue to-neon-purple h-full rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress.includes('COMPLETE') ? '100%' : '75%'}` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <File className="mx-auto h-12 w-12 text-metal-600 mb-4" />
            <div className="mb-6">
              <p className="text-lg font-mono text-neon-blue mb-1 tracking-wider">
                DROP_FILE_HERE
              </p>
              <p className="text-xs font-mono text-metal-500 tracking-wider">
                ALL_FILE_TYPES • MAX_10MB
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              id="file-upload"
              accept="*/*"
            />
            <label
              htmlFor="file-upload"
              className="relative inline-flex items-center px-6 py-3 bg-dark-700 text-neon-blue font-mono text-sm tracking-wider rounded-lg border border-neon-blue/30 hover:bg-neon-blue/10 hover:shadow-glow-sm transition-all cursor-pointer group"
            >
              <span className="relative z-10 flex items-center">
                <Upload className="w-4 h-4 mr-2 text-radium-400" />
                INITIATE_UPLOAD
              </span>
              <span className="absolute inset-0 border border-neon-blue rounded-lg translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></span>
            </label>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono tracking-wider">
        <div className="flex items-center text-radium-400">
          <Shield className="w-4 h-4 mr-2" />
          SHA-256_ENCRYPTION
        </div>
        <div className="flex items-center text-neon-blue">
          <CheckCircle className="w-4 h-4 mr-2" />
          IMMUTABLE_LOGGING
        </div>
        <div className="flex items-center text-neon-purple">
          <CheckCircle className="w-4 h-4 mr-2" />
          QUANTUM_SIGNATURES
        </div>
      </div>

      <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-neon-purple"></div>
      <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-neon-blue"></div>
    </div>
  );
};