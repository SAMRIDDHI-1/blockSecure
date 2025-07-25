import { FileRecord, BlockchainTransaction, VerificationResult, User } from '../types';
import { CryptoUtils } from '../utils/crypto';

export class BlockchainService {
  private static transactions: BlockchainTransaction[] = [];
  private static fileRecords: FileRecord[] = [];
  private static blockNumber = 1000000;
  
  // Current user simulation
  private static currentUser: User = {
    id: '1',
    address: '0x742d35Cc6634C0532925a3b8D214BAf24C8f3B12',
    name: 'John Doe',
    role: 'user',
    publicKey: 'pub_example_key_12345'
  };

  // Upload file to blockchain
  static async uploadToBlockchain(file: File): Promise<FileRecord> {
    const hash = await CryptoUtils.generateFileHash(file);
    const transactionId = CryptoUtils.generateTransactionId();
    const blockHash = CryptoUtils.generateBlockHash(hash + Date.now());
    
    // Create blockchain transaction
    const transaction: BlockchainTransaction = {
      id: transactionId,
      blockNumber: this.blockNumber++,
      timestamp: Date.now(),
      hash: blockHash,
      fileHash: hash,
      filename: file.name,
      uploader: this.currentUser.address,
      gasUsed: Math.floor(Math.random() * 50000) + 21000,
      status: 'pending'
    };

    this.transactions.push(transaction);

    // Simulate blockchain confirmation delay
    setTimeout(() => {
      transaction.status = 'confirmed';
    }, 2000 + Math.random() * 3000);

    // Create file record
    const fileRecord: FileRecord = {
      id: crypto.randomUUID(),
      filename: file.name,
      originalName: file.name,
      hash,
      size: file.size,
      uploadTimestamp: Date.now(),
      blockHash,
      transactionId,
      uploader: this.currentUser.address,
      verified: true,
      tampered: false,
      signatures: []
    };

    // Add digital signature
    const signature = await CryptoUtils.generateDigitalSignature(
      hash, 
      'private_key_example', 
      this.currentUser.name
    );
    fileRecord.signatures.push(signature);

    this.fileRecords.push(fileRecord);
    return fileRecord;
  }

  // Verify file integrity
  static async verifyFileIntegrity(file: File, originalRecord?: FileRecord): Promise<VerificationResult> {
    const currentHash = await CryptoUtils.generateFileHash(file);
    
    if (!originalRecord) {
      // Try to find record by filename
      originalRecord = this.fileRecords.find(record => 
        record.originalName === file.name || record.filename === file.name
      );
    }

    if (!originalRecord) {
      return {
        isValid: false,
        originalHash: '',
        currentHash,
        timestamp: Date.now(),
        tamperDetails: ['File not found in blockchain records']
      };
    }

    const isValid = originalRecord.hash === currentHash;
    const tamperDetails: string[] = [];

    if (!isValid) {
      tamperDetails.push('File content has been modified');
      tamperDetails.push(`Original hash: ${originalRecord.hash}`);
      tamperDetails.push(`Current hash: ${currentHash}`);
      tamperDetails.push('Hash mismatch detected - file integrity compromised');
    }

    return {
      isValid,
      originalHash: originalRecord.hash,
      currentHash,
      timestamp: Date.now(),
      blockchainRecord: originalRecord,
      tamperDetails: tamperDetails.length > 0 ? tamperDetails : undefined
    };
  }

  // Get all file records
  static getFileRecords(): FileRecord[] {
    return [...this.fileRecords];
  }

  // Get all transactions
  static getTransactions(): BlockchainTransaction[] {
    return [...this.transactions];
  }

  // Get transaction by ID
  static getTransaction(id: string): BlockchainTransaction | undefined {
    return this.transactions.find(tx => tx.id === id);
  }

  // Get current user
  static getCurrentUser(): User {
    return this.currentUser;
  }

  // Simulate smart contract execution
  static async executeSmartContract(
    contractMethod: string, 
    parameters: any[]
  ): Promise<{ success: boolean; result: any; gasUsed: number }> {
    // Simulate gas cost and execution time
    const gasUsed = Math.floor(Math.random() * 100000) + 50000;
    
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    switch (contractMethod) {
      case 'verifyFile':
        const [hash] = parameters;
        const record = this.fileRecords.find(r => r.hash === hash);
        return {
          success: true,
          result: { verified: !!record, record },
          gasUsed
        };
        
      case 'addFileRecord':
        const [fileData] = parameters;
        return {
          success: true,
          result: { added: true, id: crypto.randomUUID() },
          gasUsed
        };
        
      default:
        return {
          success: false,
          result: { error: 'Unknown contract method' },
          gasUsed: 0
        };
    }
  }
}