export interface FileRecord {
  id: string;
  filename: string;
  originalName: string;
  hash: string;
  size: number;
  uploadTimestamp: number;
  blockHash: string;
  transactionId: string;
  uploader: string;
  verified: boolean;
  tampered: boolean;
  signatures: DigitalSignature[];
}

export interface DigitalSignature {
  signer: string;
  signature: string;
  timestamp: number;
  publicKey: string;
}

export interface BlockchainTransaction {
  id: string;
  blockNumber: number;
  timestamp: number;
  hash: string;
  fileHash: string;
  filename: string;
  uploader: string;
  gasUsed: number;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface VerificationResult {
  isValid: boolean;
  originalHash: string;
  currentHash: string;
  timestamp: number;
  blockchainRecord?: FileRecord;
  tamperDetails?: string[];
}

export interface User {
  id: string;
  address: string;
  name: string;
  role: 'admin' | 'user' | 'auditor';
  publicKey: string;
}